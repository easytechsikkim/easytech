import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";
import { toast } from "sonner";
import { Mail, Navigation, Phone } from "lucide-react";
import { Button } from "../components/ui/button.jsx";
import { Input } from "../components/ui/input.jsx";
import { Textarea } from "../components/ui/textarea.jsx";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        mobile: "",
        message: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, "contacts"), {
                name: formData.name,
                mobile: formData.mobile,
                message: formData.message,
                createdAt: serverTimestamp(),
            });

            toast.success("Message sent successfully!");
            setFormData({ name: "", mobile: "", message: "" });
        } catch (error) {
            console.error("Error saving contact form:", error);
            toast.error("Something went wrong. Please try again!");
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                {/* Left: Contact Info */}
                <div>
                    <h2 className="text-4xl font-bold mb-6 text-gray-900 tracking-tight">
                        Contact Us
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                        Have questions or need help? Reach out to us and we’ll get back to
                        you as soon as possible.
                    </p>
                    <ul className="space-y-5 text-gray-700 text-base">
                        <li className="flex items-center gap-3">
                            <div className="p-3 bg-gray-100 rounded-xl">
                                <Phone className="w-5 h-5 text-gray-600" />
                            </div>
                            <span>
                <strong className="font-semibold">Phone:</strong> +91 9851933977
              </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="p-3 bg-gray-100 rounded-xl">
                                <Mail className="w-5 h-5 text-gray-600" />
                            </div>
                            <span>
                <strong className="font-semibold">Email:</strong>{" "}
                                easytech.sikkim@gmail.com
              </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="p-3 bg-gray-100 rounded-xl">
                                <Navigation className="w-5 h-5 text-gray-600" />
                            </div>
                            <span>
                <strong className="font-semibold">Address:</strong> NH-10, Beside
                Sun Pharma, Ranipool, Gangtok-737135
              </span>
                        </li>
                    </ul>
                </div>

                {/* Right: Contact Form */}
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200 p-10 shadow-xl rounded-2xl hover:shadow-2xl transition">
                    <h3 className="text-2xl font-semibold mb-6 text-gray-800">
                        Send us a message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            required
                            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70"
                        />
                        <Input
                            type="text"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={(e) =>
                                setFormData({ ...formData, mobile: e.target.value })
                            }
                            required
                            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70"
                        />
                        <Textarea
                            placeholder="Your Message"
                            rows={5}
                            value={formData.message}
                            onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                            }
                            required
                            className="rounded-xl border-gray-300 focus:ring-2 focus:ring-black/70"
                        ></Textarea>
                        <Button
                            type="submit"
                            className="w-full bg-black text-white px-5 py-3 rounded-xl font-semibold hover:bg-gray-900 transition-all"
                        >
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
