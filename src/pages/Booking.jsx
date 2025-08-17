"use client";

import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {addDoc, collection, doc, getDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../../firebase.js";
import {Loader2} from "lucide-react";
import {toast} from "sonner";

export default function BookingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    const stateService = location.state?.service;
    const serviceId = new URLSearchParams(location.search).get("serviceId");

    const [formData, setFormData] = useState({
        fullName: "",
        street: "",
        city: "",
        state: "",
        landmark: "",
        pincode: "",
        mobile: "",
        altMobile: "",
        date: "",
        time: "",
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                if (stateService) {
                    setService(stateService);
                } else if (serviceId) {
                    const docRef = doc(db, "services", serviceId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) setService({id: docSnap.id, ...docSnap.data()});
                }
            } catch (err) {
                console.error("Error fetching service:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchService();
    }, [stateService, serviceId]);

    const handleChange = (e) => {
        setFormData((prev) => ({...prev, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!service || !formData.date || !formData.time) {
            toast("Please select a date and time.");
            return;
        }

        try {
            await addDoc(collection(db, "bookings"), {
                serviceId: service.id,
                serviceName: service.name,
                price: service.price,
                ...formData,
                createdAt: serverTimestamp(),
            });
            toast("Booking confirmed!");
            navigate("/");
        } catch (err) {
            toast("Failed to save booking. Please try again.");
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600"/>
                    <p className="text-gray-600 text-lg">Loading service...</p>
                </div>
            </div>
        );

    if (!service)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                    <p className="text-red-600 text-lg mb-4">Service not found.</p>
                    <button
                        onClick={() => navigate(-1)}
                        className="bg-blue-600 text-white hover:bg-blue-700 transition max-w-xs w-full py-2 rounded"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-10">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-8">
                {/* Service Info */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">{service.name}</h1>
                    <img
                        src={service.imageURL || "/placeholder.png"}
                        alt={service.name}
                        className="mx-auto w-full max-w-md h-48 sm:h-64 object-contain rounded-lg mb-4 shadow-sm"
                        loading="lazy"
                    />
                    <p className="text-gray-600 mb-2 text-sm sm:text-base font-medium">{service.description}</p>
                    <p className="text-blue-600 font-bold text-xl sm:text-2xl font-bold">₹{Number(service.price).toLocaleString()}</p>
                </div>

                {/* Booking Form */}
                <form className="w-full max-w-lg mx-auto space-y-4" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Your Full Name"
                            required
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Address Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Street Name *</label>
                            <input
                                type="text"
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Street Name"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">City *</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">State *</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                placeholder="Landmark"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Pincode *</label>
                            <input
                                type="text"
                                name="pincode"
                                value={formData.pincode}
                                onChange={handleChange}
                                placeholder="Pincode"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Mobile No *</label>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Mobile No"
                                required
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Alternative Mobile</label>
                            <input
                                type="tel"
                                name="altMobile"
                                value={formData.altMobile}
                                onChange={handleChange}
                                placeholder="Alt Mobile"
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Date & Time */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-1">Date *</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-gray-700 font-medium mb-1">Time *</label>
                                <input
                                    type="time"
                                    name="time"
                                    value={formData.time}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:max-w-xs mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:ring-2 focus:ring-blue-500"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
}
