import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.js";
import { toast } from "sonner";
import { Mail, Navigation, Phone } from "lucide-react";
import {Button} from "../components/ui/button.jsx"
import {Input} from "../components/ui/input.jsx"
import {Textarea} from "../components/ui/textarea.jsx"

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
        <section className="py-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                {/* Left: Contact Info */}
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h2>
                    <p className="text-gray-600 mb-6">
                        Have questions or need help? Reach out to us and we’ll get back to you as soon as possible.
                    </p>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-center gap-2">
                            <Phone /> <strong>Phone:</strong> +91 9851933977
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail /> <strong>Email:</strong> easytech.sikkim@gmail.com
                        </li>
                        <li className="flex items-center gap-2">
                            <Navigation /> <strong>Address:</strong> NH-10, Beside Sun Pharma, Ranipool, Gangtok-737135
                        </li>
                    </ul>
                </div>

                {/* Right: Contact Form */}
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    <h3 className="text-2xl font-semibold mb-6">Send us a message</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                        <Input
                            type="text"
                            placeholder="Mobile"
                            value={formData.mobile}
                            onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                            required
                        />
                        <Textarea
                            placeholder="Your Message"
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        ></Textarea>
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-4 py-3 rounded font-semibold hover:bg-blue-700 transition"
                        >
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
