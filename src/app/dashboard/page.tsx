"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useUser, UserButton } from "@clerk/nextjs";

export default function MainDashboard() {
  const router = useRouter();
  const { isLoaded, isSignedIn, user } = useUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading while checking auth
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // If not signed in, redirecting
  if (!isSignedIn) {
    return null;
  }

  const tourPage = () => {
    router.push("/dashboard/managetour");
  };

  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-gray-800 px-4 py-6 flex flex-col justify-between">
        <div>
          <div className="mb-10">
            <h2 className="font-bold text-lg">Guidely</h2>
            <p className="text-sm text-gray-400">Onboarding Tours</p>
          </div>

          <nav className="space-y-2 text-sm">
            {["Dashboard", "Tours", "Steps", "Analytics", "Settings"].map(
              (item, i) => (
                <div
                  key={i}
                  className={`px-4 py-2 rounded-lg cursor-pointer ${
                    item === "Dashboard"
                      ? "bg-purple-600"
                      : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  {item}
                </div>
              )
            )}
          </nav>
        </div>

        <button
          className="bg-purple-600 rounded-lg py-3 text-sm font-semibold"
          onClick={tourPage}
        >
          Create New Tour
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">
              {user.primaryEmailAddress?.emailAddress}
            </span>
            <UserButton afterSignOutUrl="/login" />
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
              title: "Total Tours",
              value: "12",
              change: "+5% from last month",
              color: "text-green-400",
            },
            {
              title: "Avg. Completion",
              value: "86%",
              change: "+1.2% from last month",
              color: "text-green-400",
            },
            {
              title: "Active Users",
              value: "1,450",
              change: "-0.5% from last month",
              color: "text-red-400",
            },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl p-6">
              <p className="text-gray-400 text-sm">{stat.title}</p>
              <h3 className="text-2xl font-bold my-2">{stat.value}</h3>
              <p className={`text-sm ${stat.color}`}>{stat.change}</p>
            </div>
          ))}
        </section>

        {/* Recent Tours */}
        <section className="bg-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Tours</h3>
          <table className="w-full text-sm text-gray-300">
            <thead>
              <tr className="text-gray-500">
                <th className="text-left py-2">Tour Name</th>
                <th>Status</th>
                <th>Completions</th>
                <th>Last Edited</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "New User Onboarding",
                  status: "Published",
                  statusColor: "bg-green-600",
                  comp: "1,204",
                  edit: "2 days ago",
                  action: "Edit",
                },
                {
                  name: "Feature Announcement Tour",
                  status: "Draft",
                  statusColor: "bg-yellow-500",
                  comp: "-",
                  edit: "5 hours ago",
                  action: "Edit",
                },
                {
                  name: "Advanced Settings Guide",
                  status: "Published",
                  statusColor: "bg-green-600",
                  comp: "890",
                  edit: "1 week ago",
                  action: "Edit",
                },
                {
                  name: "Billing Page Walkthrough",
                  status: "Archived",
                  statusColor: "bg-gray-500",
                  comp: "2,315",
                  edit: "1 month ago",
                  action: "View",
                },
              ].map((row, i) => (
                <tr key={i} className="border-t border-gray-700">
                  <td className="py-3">{row.name}</td>
                  <td>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${row.statusColor}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>{row.comp}</td>
                  <td>{row.edit}</td>
                  <td className="text-purple-400 cursor-pointer">
                    {row.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
