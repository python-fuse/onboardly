"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Sidebar from "@/src/components/dashboard/Sidebar";

export default function MainDashboard() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  // Fetch real stats from Convex
  const tourStats = useQuery(api.tours.getTourStats);
  const recentTours = useQuery(api.tours.listUserTours);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  // Format date
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  // Show loading while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // If not signed in, redirecting
  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar onCreateClick={() => router.push("/dashboard/managetour")} />

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {user.primaryEmailAddress?.emailAddress}
            </span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Welcome */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold">
            Welcome back,{" "}
            {user.firstName ||
              user.username ||
              user.emailAddresses[0]?.emailAddress?.split("@")[0] ||
              "User"}
            !
          </h2>
          <p className="text-gray-400">Here&apos;s a summary of your tours.</p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              label: "Total Tours",
              value: tourStats?.totalTours ?? 0,
              icon: "📊",
            },
            {
              label: "Published Tours",
              value: tourStats?.publishedTours ?? 0,
              icon: "✅",
            },
            {
              label: "Draft Tours",
              value: tourStats?.draftTours ?? 0,
              icon: "📝",
            },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl p-6">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <h3 className="text-3xl font-bold my-2">
                {tourStats === undefined ? "..." : stat.value}
              </h3>
            </div>
          ))}
        </section>

        {/* Recent Tours */}
        <section className="bg-gray-800 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Recent Tours</h3>
            <button
              onClick={() => router.push("/dashboard/managetour")}
              className="text-purple-400 text-sm hover:underline"
            >
              View All
            </button>
          </div>

          {recentTours === undefined && (
            <div className="items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}

          {recentTours && recentTours.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              No tours yet. Create your first tour!
            </div>
          )}

          {recentTours && recentTours.length > 0 && (
            <table className="w-full text-sm text-gray-300">
              <thead>
                <tr className="text-gray-500">
                  <th className="text-left py-2">Tour Name</th>
                  <th>Status</th>
                  <th>Steps</th>
                  <th>Last Edited</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentTours.slice(0, 5).map((tour) => (
                  <tr key={tour._id} className="border-t border-gray-700">
                    <td className="py-3">{tour.name}</td>
                    <td>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          tour.published ? "bg-green-600" : "bg-gray-500"
                        }`}
                      >
                        {tour.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="text-center">{tour.steps.length}</td>
                    <td>{formatDate(tour.updatedAt)}</td>
                    <td
                      className="text-purple-400 cursor-pointer hover:underline"
                      onClick={() =>
                        router.push(`/dashboard/edittour?id=${tour._id}`)
                      }
                    >
                      Edit
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}
