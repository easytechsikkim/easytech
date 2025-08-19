import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { db } from "../../firebase.js";
import { generateServiceJsonLd, generateBusinessJsonLd } from "@/lib/jsonld.js";

export default function ServicesPage() {
    const [categories, setCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loading, setLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const urlCategory = new URLSearchParams(location.search).get("category");

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const snapshot = await getDocs(collection(db, "categories"));
                const categoryList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(categoryList);
                setSelectedCategory(urlCategory || null);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, [urlCategory]);

    // Fetch services
    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const q = selectedCategory
                    ? query(
                        collection(db, "services"),
                        where("categoryId", "==", selectedCategory)
                    )
                    : query(collection(db, "services"));

                const snapshot = await getDocs(q);
                setServices(
                    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                );
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };
        fetchServices();
    }, [selectedCategory]);

    const handleCategorySelect = (catId) => {
        setSelectedCategory(catId);
        navigate(catId ? `?category=${catId}` : location.pathname);
        window.scrollTo(0, 0);
    };

    return (
        <>
            {/* JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBusinessJsonLd()),
                }}
            />
            {services.map((service) => (
                <script
                    key={service.id}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(generateServiceJsonLd(service)),
                    }}
                />
            ))}

            <div className="pt-24 container mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Categories Sidebar */}
                <div className="md:col-span-1 bg-white/80 backdrop-blur-sm border border-stone-300 shadow-sm rounded-xl">
                    <h2 className="text-lg font-semibold text-stone-800 mb-2 border-b border-stone-300 p-2">Categories</h2>
                    <ul className="space-y-2 p-3">
                        <li
                            className={`px-2 py-2 rounded-lg cursor-pointer text-sm font-medium transition ${
                                selectedCategory === null
                                    ? "bg-blue-600 text-white shadow"
                                    : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                            }`}
                            onClick={() => handleCategorySelect(null)}
                        >
                            All Services
                        </li>
                        {categories.map((cat) => (
                            <li
                                key={cat.id}
                                className={`px-2 py-2 rounded-lg cursor-pointer text-sm font-medium transition ${
                                    selectedCategory === cat.id
                                        ? "bg-blue-600 text-white shadow"
                                        : "bg-stone-100 hover:bg-stone-200 text-stone-700"
                                }`}
                                onClick={() => handleCategorySelect(cat.id)}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services Section */}
                <div className="md:col-span-3">
                    <h2 className="text-2xl font-bold text-stone-800 mb-6">
                        {selectedCategory
                            ? categories.find((c) => c.id === selectedCategory)?.name
                            : "All Services"}
                    </h2>

                    {loading ? (
                        <p className="text-gray-500">Loading services...</p>
                    ) : services.length === 0 ? (
                        <p className="text-gray-500">No services found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => (
                                <div
                                    key={service.id}
                                    className="group flex flex-col bg-white/90 backdrop-blur-sm border border-stone-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* Image */}
                                    <div className="relative w-full h-48 bg-stone-100 overflow-hidden">
                                        <img
                                            src={service.imageURL}
                                            alt={service.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex flex-col flex-1 p-4">
                                        <h3 className="text-lg font-semibold text-stone-800">
                                            {service.name}
                                        </h3>
                                        <p className="text-sm text-stone-600 mb-2 line-clamp-4">
                                            {service.description}
                                        </p>
                                        <p className="font-bold text-blue-600 mb-2">
                                            Starting at ₹{Number(service.price).toLocaleString()}
                                        </p>

                                        <Link
                                            to="/booking"
                                            state={{ service }}
                                            className="mt-auto bg-blue-600 text-white text-center text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
