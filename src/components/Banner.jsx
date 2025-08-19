import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

export default function Banner() {
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const fetchBanner = async () => {
            const docRef = doc(db, "banners", "homeBanner");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setBanner(docSnap.data());
            } else {
                console.log("No banner found!");
            }
        };

        fetchBanner();
    }, []);

    if (!banner) return null;

    const { imageURL, title, subtitle, ctaText, ctaLink } = banner;

    return (
        <section
            className="relative mt-14 h-[70vh] flex items-center justify-center text-center overflow-hidden"
            style={{ backgroundImage: `url(${imageURL})` }}
        >
            {/* Overlay with gradient (modern look) */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>

            <div className="relative z-10 max-w-3xl mx-auto px-6 animate-fadeInUp">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">
                    {title}
                </h1>
                <p className="text-lg md:text-2xl text-gray-200 mb-8">
                    {subtitle}
                </p>
                <Link
                    to={ctaLink}
                    className="inline-block px-6 py-3 bg-white text-black font-semibold rounded-xl shadow-lg hover:scale-105 hover:bg-gray-100 transition-transform"
                >
                    {ctaText}
                </Link>
            </div>
        </section>
    );
}
