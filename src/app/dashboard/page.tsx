"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Sidebar from "@/src/components/dashboard/Sidebar";

export default function MainDashboard() {
  const router = useRouter();

  const tourPage = () => {
    router.push("/dashboard/managetour");
  };

  return (
    <div className="flex min-h-screen text-white">
      {/* Sidebar */}
      <Sidebar showCreateButton={true} onCreateClick={tourPage} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 w-full md:w-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-6 md:mb-10 mt-12 md:mt-0">
          <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>
          <div className="w-9 h-9 rounded-full bg-gray-700"></div>
        </header>

        {/* Welcome */}
        <section className="mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Welcome back, User!</h2>
          <p className="text-gray-400 text-sm md:text-base">Here&apos;s a summary of your tours.</p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
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
            <div key={i} className="bg-gray-800 text-center md:text-left rounded-2xl p-4 md:p-6">
              <p className="text-gray-400 text-xs md:text-sm">{stat.title}</p>
              <h3 className="text-xl md:text-2xl font-bold my-2">{stat.value}</h3>
              <p className={`text-xs md:text-sm ${stat.color}`}>{stat.change}</p>
            </div>
          ))}
        </section>

        {/* Recent Tours - Desktop Table */}
        <section className="bg-gray-800 rounded-2xl p-4 md:p-6">
          <h3 className="text-base md:text-lg font-semibold mb-4">Recent Tours</h3>
          
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
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
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
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
              <div key={i} className="bg-gray-900 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-sm">{row.name}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${row.statusColor}`}
                  >
                    {row.status}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mb-3">
                  <span>Completions: {row.comp}</span>
                  <span>{row.edit}</span>
                </div>
                <button className="text-purple-400 text-sm font-medium">
                  {row.action}
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}