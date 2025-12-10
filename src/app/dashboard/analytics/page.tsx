import Sidebar from "@/src/components/dashboard/Sidebar";
import Image from "next/image";

export default function Analytics() {
  return (
    <div className="flex text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar showCreateButton={false} />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-10 mt-16 md:mt-0">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Analytics</h1>
            <p className="text-gray-300 text-sm md:text-base">
              Key metrics for your onboarding tours.
            </p>
          </div>
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm w-full md:w-auto">
            Export Data
          </button>
        </div>

        {/* Date Range Tabs */}
        <div className="flex gap-2 md:gap-4 mb-6 md:mb-10 text-gray-300 text-xs md:text-sm overflow-x-auto pb-2">
          {["Last 7 days", "Last 30 days", "Last 90 days", "Custom Range"].map(
            (label, index) => (
              <button
                key={index}
                className={`px-3 md:px-4 py-2 rounded-full transition border border-gray-700 whitespace-nowrap ${
                  index === 0
                    ? "bg-purple-600"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {[
            {
              title: "Total Tours Completed",
              value: "1,284",
              change: "+2.5%",
              changeColor: "text-green-400",
            },
            {
              title: "Avg Completion Rate",
              value: "82.5%",
              change: "-0.8%",
              changeColor: "text-red-400",
            },
            {
              title: "Avg Time to Complete",
              value: "2m 15s",
              change: "+5s",
              changeColor: "text-green-400",
            },
            {
              title: "Total Engaged Users",
              value: "4,602",
              change: "+12%",
              changeColor: "text-green-400",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 p-4 md:p-6 rounded-2xl text-center md:text-left shadow-sm flex flex-col gap-2"
            >
              <p className="text-gray-400 text-xs md:text-sm">{item.title}</p>
              <h2 className="text-2xl md:text-3xl font-bold">{item.value}</h2>
              <p className={`text-xs md:text-sm ${item.changeColor}`}>{item.change}</p>
            </div>
          ))}
        </div>

        {/* Tour Completion Trends */}
        <div className="bg-white/5 rounded-2xl p-4 md:p-8 mb-8 md:mb-12">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Tour Completion Trends</h2>
          <div className="flex justify-center">
            <div className="bg-gray-900 p-4 md:p-8 rounded-xl w-full max-w-md">
              <div className="w-full aspect-square bg-white/5 flex items-center justify-center rounded-lg">
                <Image
                  src="/analytics"
                  alt="analytics"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* Top Performing Tours */}
          <div className="bg-white/5 p-4 md:p-6 rounded-2xl overflow-x-auto">
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Top Performing Tours</h2>
            <table className="w-full text-left text-gray-300 text-xs md:text-sm">
              <thead>
                <tr className="text-gray-500">
                  <th className="py-2">Tour Name</th>
                  <th className="py-2">Views</th>
                  <th className="py-2">Completion Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Welcome Tour", views: "2,105", rate: "95%" },
                  { name: "New Feature Guide", views: "1,842", rate: "91%" },
                  { name: "Dashboard Overview", views: "1,560", rate: "88%" },
                  { name: "Advanced Settings", views: "980", rate: "75%" },
                ].map((row, i) => (
                  <tr key={i}>
                    <td className="py-2">{row.name}</td>
                    <td className="py-2 text-gray-400">{row.views}</td>
                    <td className="py-2 text-gray-400">{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Most Skipped Steps */}
          <div className="bg-white/5 p-4 md:p-6 rounded-2xl">
            <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">Most Skipped Steps</h2>
            <div className="space-y-4 md:space-y-6">
              {[
                { step: "Step 3: Invite Team", skips: 124 },
                { step: "Step 5: Connect Integrations", skips: 98 },
                { step: "Step 2: Create Project", skips: 72 },
                { step: "Step 7: Billing Details", skips: 55 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1 text-xs md:text-sm text-gray-300">
                    <span>{item.step}</span>
                    <span className="text-gray-400">{item.skips} skips</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full">
                    <div
                      className="bg-purple-600 h-full rounded-full"
                      style={{ width: `${(item.skips / 124) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}