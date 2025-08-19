import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";
import {db} from "../../firebase.js";

export default function CategorySection() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const q = query(
                    collection(db, "categories"),
                    where("isActive", "==", true),
                );

                const querySnapshot = await getDocs(q);
                const data = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories: ", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <section className="py-8 bg-stone-50 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-semibold">Browse by Categories</h2>
                    <Link
                        to="/services"
                        className="text-black font-medium hover:text-green-900"
                    >
                        Explore All
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map(({id, name, iconURL}) => (
                        <Link
                            key={id}
                            to={`/services?category=${id}`}
                            className="group flex flex-col items-center rounded-2xl border border-stone-300 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-2 gap-4"
                        >
                            {/* Image wrapper - bigger but padded inside */}
                            <div
                                className="relative w-40 h-40 flex items-center justify-center rounded-xl bg-white border border-stone-300 group-hover:scale-101 transition">
                                <img
                                    src={iconURL}
                                    alt={name}
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* Label */}
                            <span
                                className="text-center text-sm sm:text-base font-medium text-stone-800 group-hover:text-green-950 capitalize transition-colors">
                            {name}
                          </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>

    );
}
