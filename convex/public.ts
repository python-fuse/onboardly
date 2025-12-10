import { v } from "convex/values";
import { query } from "./_generated/server";

// Public query to fetch a published tour by scriptId
// This is used by the widget - no authentication required
export const getTourByScriptId = query({
  args: { scriptId: v.string() },
  handler: async (ctx, args) => {
    const tour = await ctx.db
      .query("tours")
      .withIndex("by_scriptId", (q) => q.eq("scriptId", args.scriptId))
      .first();

    if (!tour) {
      throw new Error("Tour not found");
    }

    if (!tour.published) {
      throw new Error("Tour is not published");
    }

    // Return only the data needed by the widget
    return {
      tourId: tour.tourId,
      steps: tour.steps,
      autoStart: tour.autoStart,
      showProgress: tour.showProgress,
      allowSkip: tour.allowSkip,
    };
  },
});
