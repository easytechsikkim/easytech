import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
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
                    limit(6)
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
        <section className="py-4 bg-gray-50 px-4 sm:px-6 lg:px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-semibold">Browse by Categories</h2>
                    <Link
                        to="/services"
                        className="text-black font-semibold hover:underline"
                    >
                        Explore All
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {categories.map((cat) => {
                        const { id, name, iconURL } = cat;
                        return (
                            <Link
                                key={id}
                                to={`/services?category=${id}`}
                                className="flex flex-col items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition"
                            >
                                <img
                                    src={iconURL}
                                    alt={name}
                                    className="w-24 h-24 mb-3 object-contain"
                                />
                                <span className="text-center font-medium">{name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
