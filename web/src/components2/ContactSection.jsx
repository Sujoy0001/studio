import React, { useState } from 'react';
import { BsEnvelope, BsPhone, BsSend } from 'react-icons/bs';
import bgImg from "../assets/aboutimg.png"; // replace with your image path

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(import.meta.env.VITE_FORMSPREE_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });

      if (res.ok) {
        setStatus("Message sent successfully");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message");
    }
  };

  return (
    <section
      id="contact"
      className="relative mt-8 py-12 px-4 text-white bg-cover bg-center bg-no-repeat sujoy3"
      style={{ backgroundImage: `url(${bgImg})` }}
    >
      {/* Overlay Blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>

      <div className="relative max-w-2xl mx-auto text-center z-10">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-6xl md:text-5xl font-bold sujoy mb-6">
            Start Your Project
          </h1>
          <p className="text-xl text-gray-200">
            Let's discuss your ideas and create something extraordinary together.
          </p>
        </div>

        {/* Form Box */}
        <div className="rounded-md p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <textarea
              name="message"
              placeholder="Tell us about your project..."
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent resize-none"
            />
            <button
              type="submit"
              className="w-full cursor-pointer flex items-center justify-center gap-2 px-8 py-4 bg-white sujoy text-2xl text-orange-500 font-semibold rounded-lg hover:bg-orange-800 transition-colors"
            >
              <BsSend size={18} />
              Send Message
            </button>
          </form>

          {status && (
            <p className="mt-4 text-center text-lg font-semibold sujoy text-green-400">
              {status}
            </p>
          )}

          {/* Quick Contact */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8 pt-8 border-t border-gray-200">
            <div className="flex font-semibold font-2xl sujoy3 items-center gap-3 text-white">
              <BsEnvelope size={18} />
              <span>sujoygarai89@gmail.com</span>
            </div>
            <div className="flex items-center font-2xl sujoy gap-3 text-white">
              <BsPhone size={18} />
              <span>+91 6294178990</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
