import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";

// Internal mutation to track analytics events (called from HTTP action)
export const trackEvent = internalMutation({
  args: {
    tourId: v.string(),
    eventType: v.string(),
    timestamp: v.number(),
    stepId: v.optional(v.string()),
    sessionId: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("analytics", {
      tourId: args.tourId,
      eventType: args.eventType,
      timestamp: args.timestamp,
      stepId: args.stepId,
      sessionId: args.sessionId,
      userAgent: args.userAgent,
    });
  },
});

// Get analytics for user's tours
export const getAnalytics = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    // Get user's tours
    const userTours = await ctx.db
      .query("tours")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const tourIds = userTours.map((tour) => tour.tourId);

    // Get all analytics events for user's tours
    const allEvents = await ctx.db.query("analytics").collect();
    const events = allEvents.filter((event) => tourIds.includes(event.tourId));

    // Calculate stats
    const totalEvents = events.length;
    const tourStarts = events.filter(
      (e) => e.eventType === "tour_started"
    ).length;
    const tourCompletions = events.filter(
      (e) => e.eventType === "tour_completed"
    ).length;
    const tourSkips = events.filter(
      (e) => e.eventType === "tour_skipped"
    ).length;
    const completionRate =
      tourStarts > 0
        ? ((tourCompletions / tourStarts) * 100).toFixed(1)
        : "0.0";

    // Get events by tour
    const eventsByTour: { [key: string]: any } = {};
    userTours.forEach((tour) => {
      const tourEvents = events.filter((e) => e.tourId === tour.tourId);
      const starts = tourEvents.filter(
        (e) => e.eventType === "tour_started"
      ).length;
      const completions = tourEvents.filter(
        (e) => e.eventType === "tour_completed"
      ).length;

      eventsByTour[tour.tourId] = {
        tourName: tour.name,
        starts,
        completions,
        completionRate:
          starts > 0 ? ((completions / starts) * 100).toFixed(1) : "0.0",
      };
    });

    // Get recent events (last 20)
    const recentEvents = events
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20)
      .map((event) => {
        const tour = userTours.find((t) => t.tourId === event.tourId);
        return {
          ...event,
          tourName: tour?.name || "Unknown",
        };
      });

    return {
      overview: {
        totalEvents,
        tourStarts,
        tourCompletions,
        tourSkips,
        completionRate,
      },
      byTour: eventsByTour,
      recentEvents,
    };
  },
});
