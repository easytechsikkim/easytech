const BASE_URL = "https://easytechsikkim.vercel.app/";

export function generateBusinessJsonLd() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "EASY TECH",
        "image": `${BASE_URL}/logo.png`,
        "url": BASE_URL,
        "telephone": "+91-9851933977",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "NH-10, Beside Sun Pharma, Ranipool",
            "addressLocality": "Gangtok",
            "addressRegion": "Sikkim",
            "postalCode": "737135",
            "addressCountry": "IN"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
                ],
                "opens": "09:00",
                "closes": "20:00"
            }
        ],
        "priceRange": "₹₹",
        "sameAs": [
            "https://facebook.com/easytech",
            "https://instagram.com/easytech"
        ]
    };
}

// 2. Service Schema
export function generateServiceJsonLd(service) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": service.name,
        "description": service.description,
        "provider": {
            "@type": "LocalBusiness",
            "name": "EASY TECH",
            "url": BASE_URL
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": service.price,
            "url": `${BASE_URL}/services/${service.id}`,
            "availability": "https://schema.org/InStock"
        }
    };
}

// 3. Product Schema
export function generateProductJsonLd(product) {
    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": [
            product.imageURL.startsWith("http") ? product.imageURL : `${BASE_URL}${product.imageURL}`
        ],
        "sku": product.id,
        "brand": {
            "@type": "Brand",
            "name": product.brand || "EASY TECH"
        },
        "offers": {
            "@type": "Offer",
            "url": `${BASE_URL}/products/${product.id}`,
            "priceCurrency": "INR",
            "price": product.price,
            "availability": "https://schema.org/InStock"
        }
    };
}
