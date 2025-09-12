// src\app\[usertype]\home-controls\page.tsx

import React from "react";
import {
  Users,
  Calendar,
  Trophy,
  FileText,
  Edit3,
  Save,
  Upload,
} from "lucide-react";
import AdminLayout from "../_layout/AdminLayout";

const AdminPanel = () => {
  const HomeControlsPage = () => (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Home Page Controls
            </h2>
            <p className="mt-1 text-gray-600">
              Manage content displayed on the main homepage
            </p>
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Hero Banner</h3>
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
            <Edit3 size={16} />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Banner Title
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Enter banner title..."
                defaultValue="Title - 1"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Banner Subtitle
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Enter banner subtitle..."
                defaultValue="Write a subtitle with a catchy phrase or quote in this line"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Button Text
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Enter button text..."
                defaultValue="Explore Athletes"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Banner Image
              </label>
              <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2">
                  <button className="text-blue-600 hover:text-blue-700">
                    Upload new image
                  </button>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-100 p-2">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Athletes
              </p>
              <p className="text-2xl font-bold text-gray-900">247</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-100 p-2">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Upcoming Events
              </p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-yellow-100 p-2">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Medals</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-100 p-2">
              <FileText className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">News Articles</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section Controls */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">About Section</h3>
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
            <Edit3 size={16} />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Section Heading
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                defaultValue="Placeholder - Write the main title here"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                rows={4}
                defaultValue="Placeholder - Write a brief overview of the Paralympic Movement..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Statistics
            </label>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-3">
                  <input
                    type="text"
                    className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Value (e.g., 123+)"
                    defaultValue="123+"
                  />
                  <input
                    type="text"
                    className="flex-1 rounded-lg border border-gray-300 p-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Label"
                    defaultValue="Title Goes Here"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <AdminLayout currentPage="home-controls">
      <HomeControlsPage />
    </AdminLayout>
  );
};

export default AdminPanel;