"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { posts } from "~@/lib/data";
import PostCard from "~@/components/PostCard";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "~@/components/icons/SocialIcons";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("posts");
  const userPosts = posts.slice(0, 4);

  return (
    <div className="max-w-[1200px] mx-auto py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden mb-8">
        {/* Cover Image */}
        <div className="h-48 bg-linear-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute -bottom-16 left-8">
            <div className="relative h-32 w-32 rounded-full border-4 border-white overflow-hidden">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">John Doe</h1>
              <p className="text-gray-600 mb-4">Writer & Content Creator</p>
              <div className="flex space-x-4 mb-4 md:mb-0">
                <a
                  href="https://"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="https://"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://"
                  className="text-gray-600 hover:text-blue-600"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="flex space-x-3">
              <Link
                href="/create-blog"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Post
              </Link>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="bg-white rounded-lg shadow-xs overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button
              type="button"
              onClick={() => setActiveTab("posts")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "posts"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Posts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("drafts")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "drafts"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Drafts
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "saved"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Saved
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-4 text-sm font-medium ${
                activeTab === "settings"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Settings
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "posts" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Your Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}

          {activeTab === "drafts" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Your Drafts</h2>
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  You don't have any drafts yet.
                </p>
                <Link
                  href="/create-blog"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Create New Post
                </Link>
              </div>
            </div>
          )}

          {activeTab === "saved" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Saved Posts</h2>
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  You haven't saved any posts yet.
                </p>
                <Link
                  href="/blog"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Browse Posts
                </Link>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      defaultValue="john.doe@example.com"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      defaultValue="johndoe"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      defaultValue="Writer & Content Creator"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="twitter"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Twitter
                      </label>
                      <input
                        id="twitter"
                        type="text"
                        defaultValue="https://twitter.com/johndoe"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="facebook"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Facebook
                      </label>
                      <input
                        id="facebook"
                        type="text"
                        defaultValue="https://facebook.com/johndoe"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="instagram"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Instagram
                      </label>
                      <input
                        id="instagram"
                        type="text"
                        defaultValue="https://instagram.com/johndoe"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="linkedin"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        LinkedIn
                      </label>
                      <input
                        id="linkedin"
                        type="text"
                        defaultValue="https://linkedin.com/in/johndoe"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
