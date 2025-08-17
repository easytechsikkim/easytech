import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import {db} from "../../firebase.js";

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
            className="relative text-white py-32 text-center bg-cover bg-center mt-14"
            style={{ backgroundImage: `url(${imageURL})` }}
        >
            <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                <p className="text-lg md:text-xl mb-6">{subtitle}</p>
                <Link
                    to={ctaLink}
                    className="inline-block px-4 py-2 bg-white text-black font-semibold rounded-md shadow hover:bg-gray-100 transition"
                >
                    {ctaText}
                </Link>
            </div>
        </section>
    );
}
