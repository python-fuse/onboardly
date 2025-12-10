"use client";

import Sidebar from "@/src/components/dashboard/Sidebar";
import { BarChart3, TrendingUp, Users, Clock, Activity } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Analytics() {
  const analytics = useQuery(api.analytics.getAnalytics);

  if (!analytics) {
    return (
      <div className="flex text-white min-h-screen">
        <Sidebar showCreateButton={false} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Loading analytics...</div>
        </div>
      </div>
    );
  }

  const { overview, byTour, recentEvents } = analytics;

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
              Track your tour performance and user engagement.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-xs md:text-sm">Tour Starts</p>
              <Activity size={20} className="text-purple-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              {overview.tourStarts}
            </h2>
            <p className="text-xs text-gray-500">Total tours initiated</p>
          </div>

          <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-xs md:text-sm">Completions</p>
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              {overview.tourCompletions}
            </h2>
            <p className="text-xs text-gray-500">Tours completed</p>
          </div>

          <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-xs md:text-sm">
                Completion Rate
              </p>
              <BarChart3 size={20} className="text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              {overview.completionRate}%
            </h2>
            <p className="text-xs text-gray-500">Average success rate</p>
          </div>

          <div className="bg-white/5 p-4 md:p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-xs md:text-sm">Tours Skipped</p>
              <Clock size={20} className="text-orange-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              {overview.tourSkips}
            </h2>
            <p className="text-xs text-gray-500">Early exits</p>
          </div>
        </div>

        {/* Tours Performance Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 mb-8">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
            Tour Performance
          </h2>
          {Object.keys(byTour).length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300 text-xs md:text-sm">
                <thead>
                  <tr className="text-gray-500 border-b border-white/10">
                    <th className="py-3 px-2">Tour Name</th>
                    <th className="py-3 px-2">Starts</th>
                    <th className="py-3 px-2">Completions</th>
                    <th className="py-3 px-2">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(byTour).map(
                    ([tourId, stats]: [string, any]) => (
                      <tr key={tourId} className="border-b border-white/5">
                        <td className="py-3 px-2">{stats.tourName}</td>
                        <td className="py-3 px-2 text-gray-400">
                          {stats.starts}
                        </td>
                        <td className="py-3 px-2 text-gray-400">
                          {stats.completions}
                        </td>
                        <td className="py-3 px-2">
                          <span
                            className={`${
                              parseFloat(stats.completionRate) >= 80
                                ? "text-green-400"
                                : parseFloat(stats.completionRate) >= 50
                                ? "text-yellow-400"
                                : "text-red-400"
                            }`}
                          >
                            {stats.completionRate}%
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Users size={48} className="mx-auto mb-3 opacity-50" />
              <p>
                No tour data yet. Publish a tour to start tracking analytics.
              </p>
            </div>
          )}
        </div>

        {/* Recent Events */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 md:mb-6">
            Recent Activity
          </h2>
          {recentEvents.length > 0 ? (
            <div className="space-y-3">
              {recentEvents.map((event: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 px-3 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        event.eventType === "tour_completed"
                          ? "bg-green-400"
                          : event.eventType === "tour_started"
                          ? "bg-blue-400"
                          : event.eventType === "tour_skipped"
                          ? "bg-orange-400"
                          : "bg-gray-400"
                      }`}
                    />
                    <div>
                      <p className="text-sm">{event.tourName}</p>
                      <p className="text-xs text-gray-400">
                        {event.eventType.replace("_", " ")}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Activity size={48} className="mx-auto mb-3 opacity-50" />
              <p>No events tracked yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
