import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { generateBusinessJsonLd, generateServiceJsonLd } from "@/lib/jsonld.js";
import { db } from "../../firebase.js";

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
                const categoryList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
                let q = selectedCategory
                    ? query(collection(db, "services"), where("categoryId", "==", selectedCategory))
                    : query(collection(db, "services"));
                const snapshot = await getDocs(q);
                setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
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
    };

    // JSON-LD injection (Business + all services individually)
    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [generateBusinessJsonLd(), ...services.map(generateServiceJsonLd)],
    };

    return (
        <>
            {/* Inject JSON-LD */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
            />

            <div className="pt-20 container mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Categories */}
                <div className="md:col-span-1 bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">Categories</h2>
                    <ul className="space-y-2">
                        <li
                            className={`p-2 rounded cursor-pointer transition ${
                                selectedCategory === null ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => handleCategorySelect(null)}
                        >
                            All Services
                        </li>
                        {categories.map(cat => (
                            <li
                                key={cat.id}
                                className={`p-2 rounded cursor-pointer transition ${
                                    selectedCategory === cat.id ? "bg-blue-600 text-white" : "bg-gray-100 hover:bg-gray-200"
                                }`}
                                onClick={() => handleCategorySelect(cat.id)}
                            >
                                {cat.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Services */}
                <div className="md:col-span-3 bg-white shadow rounded p-4">
                    <h2 className="text-xl font-semibold mb-4">
                        {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : "All Services"}
                    </h2>

                    {loading ? (
                        <p className="text-gray-500">Loading services...</p>
                    ) : services.length === 0 ? (
                        <p className="text-gray-500">No services found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map(service => (
                                <div key={service.id} className="border border-stone-300 rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col">
                                    <img src={service.imageURL} alt={service.name} className="w-full h-40 object-cover rounded mb-3" />
                                    <h3 className="text-lg font-semibold">{service.name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                                    <p className="font-bold text-blue-600 mb-3">₹{Number(service.price).toLocaleString()}</p>
                                    <Link to={`/booking?serviceId=${service.id}`} className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-center block">
                                        Book Now
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
