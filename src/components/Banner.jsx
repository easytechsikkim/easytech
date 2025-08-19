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
            className="relative mt-14 min-h-[50vh] md:min-h-[70vh] flex items-center justify-center text-center overflow-hidden bg-black">
            {/* Banner Image with responsive sizing */}
            <img
                src={imageURL}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover md:object-cover sm:object-contain mx-auto"
                loading="eager"
            />

            {/* Enhanced gradient overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90 md:from-black/80 md:via-black/30 md:to-black/80"></div>

            {/* Responsive text container */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-white drop-shadow-lg mb-3 md:mb-4 px-2">
                        {title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-4 sm:mb-5 md:mb-6 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                    <Link
                        to={ctaLink}
                        className="inline-block px-5 py-2.5 sm:px-6 sm:py-3 bg-white text-black font-semibold rounded-xl shadow-lg hover:scale-105 hover:bg-gray-100 active:scale-95 transition-all duration-200 text-base sm:text-lg"
                    >
                        {ctaText}
                    </Link>
                </div>
            </div>
        </section>
    );
}
