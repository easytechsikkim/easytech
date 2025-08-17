import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { generateServiceJsonLd, generateBusinessJsonLd } from "@/lib/jsonld.js";
import { db } from "../../firebase.js";

export default function ServicesPage() {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    // Parse category from URL query (?category=...)
    const urlCategory = new URLSearchParams(location.search).get("category");

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "categories"));
                const categoryList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(categoryList);

                if (urlCategory) {
                    setSelectedCategory(urlCategory);
                } else {
                    setSelectedCategory(null);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, [urlCategory]);

    // Fetch services
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                let q;
                if (selectedCategory) {
                    q = query(
                        collection(db, "services"),
                        where("categoryId", "==", selectedCategory)
                    );
                } else {
                    q = query(collection(db, "services"));
                }

                const querySnapshot = await getDocs(q);
                const serviceList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setServices(serviceList);
            } catch (err) {
                console.error("Error fetching services:", err);
            }
            setLoading(false);
        };

        fetchServices();
    }, [selectedCategory]);

    // Update URL when category changes
    const handleCategorySelect = (catId) => {
        setSelectedCategory(catId);
        if (catId) {
            navigate(`?category=${catId}`);
        } else {
            navigate(location.pathname);
        }
    };

    return (
        <>
            {/* JSON-LD Injection */}
            {/* Business info */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBusinessJsonLd()),
                }}
            />

            {/* Each service separately */}
            {services.map((service) => (
                <script
                    key={service.id}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateServiceJsonLd(service)),
                    }}
                />
            ))}

            <div className="pt-20 container mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Left: Categories */}
                <div className="md:col-span-1 bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">Categories</h2>
                    <ul className="space-y-2">
                        <li
                            className={`p-2 rounded cursor-pointer transition ${
                                selectedCategory === null
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => handleCategorySelect(null)}
                        >
                            All Services
                        </li>
                        {categories.map((cat) => (
                            <li
                                key={cat.id}
                                className={`p-2 rounded cursor-pointer transition ${
                                    selectedCategory === cat.id
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 hover:bg-gray-200"
                                }`}
                                onClick={() => handleCategorySelect(cat.id)}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: Services */}
                <div className="md:col-span-3 bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedCategory
                            ? categories.find((c) => c.id === selectedCategory)?.name
                            : "All Services"}
                    </h2>

                    {loading ? (
                        <p className="text-gray-500">Loading services...</p>
                    ) : services.length === 0 ? (
                        <p className="text-gray-500">No services found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => {
                                const { id, name, description, price, imageURL } = service;
                                return (
                                    <div
                                        key={id}
                                        className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col"
                                    >
                                        <img
                                            src={imageURL}
                                            alt={name}
                                            className="w-full h-40 object-cover rounded mb-3"
                                        />
                                        <h3 className="text-lg font-semibold">{name}</h3>
                                        <p className="text-sm text-gray-600 mb-2">{description}</p>
                                        <p className="font-bold text-blue-600 mb-3">
                                            ₹{Number(price).toLocaleString()}
                                        </p>
                                        <Link
                                            to={`/booking?serviceId=${id}`}
                                            className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-center block"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
