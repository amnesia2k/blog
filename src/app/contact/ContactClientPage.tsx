"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitch,
  Twitter,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <div className="flex items-center text-sm">
          <Link href="/" className="hover:text-blue-600">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span>Contact</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div>
            <h2 className="text-xl font-semibold mb-6">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-1"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="shrink-0 mt-1">
                  <MapPin />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Address</h3>
                  <p className="text-sm">
                    123 Blog Street, San Francisco, CA 94107
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="shrink-0 mt-1">
                  <Mail />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  <p className="text-sm ">info@metablog.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="shrink-0 mt-1">
                  <Phone />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Phone</h3>
                  <p className="text-sm ">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-6">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://" className=" hover:text-blue-600">
                <Facebook />
              </a>

              <a href="https://" className=" hover:text-blue-600">
                <Twitter />
              </a>

              <a href="https://" className=" hover:text-blue-600">
                <Instagram />
              </a>

              <a href="https://" className=" hover:text-blue-600">
                <Linkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
