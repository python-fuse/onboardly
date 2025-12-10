import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Helper to generate a random script ID
function generateScriptId(): string {
  return `tour_${Math.random().toString(36).substring(2, 15)}${Math.random()
    .toString(36)
    .substring(2, 15)}`;
}

// Query to list all tours for the current user
export const listUserTours = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const tours = await ctx.db
      .query("tours")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    return tours;
  },
});

// Query to get a single tour by ID
export const getTour = query({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const tour = await ctx.db.get(args.tourId);

    if (!tour) {
      throw new Error("Tour not found");
    }

    // Ensure user owns this tour
    if (tour.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    return tour;
  },
});

// Query to get tour stats for dashboard
export const getTourStats = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const tours = await ctx.db
      .query("tours")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();

    const totalTours = tours.length;
    const publishedTours = tours.filter((t) => t.published).length;
    const draftTours = tours.filter((t) => !t.published).length;
    const totalSteps = tours.reduce((sum, t) => sum + t.steps.length, 0);

    return {
      totalTours,
      publishedTours,
      draftTours,
      totalSteps,
    };
  },
});

// Mutation to create a new tour
export const createTour = mutation({
  args: {
    name: v.string(),
    tourId: v.string(),
    autoStart: v.optional(v.boolean()),
    showProgress: v.optional(v.boolean()),
    allowSkip: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const now = Date.now();

    const tourId = await ctx.db.insert("tours", {
      userId: identity.subject,
      name: args.name,
      tourId: args.tourId,
      steps: [],
      autoStart: args.autoStart ?? false,
      showProgress: args.showProgress ?? true,
      allowSkip: args.allowSkip ?? true,
      published: false,
      createdAt: now,
      updatedAt: now,
    });

    return tourId;
  },
});

// Mutation to update a tour
export const updateTour = mutation({
  args: {
    tourId: v.id("tours"),
    name: v.optional(v.string()),
    tourIdString: v.optional(v.string()),
    steps: v.optional(
      v.array(
        v.object({
          id: v.string(),
          targetSelector: v.string(),
          title: v.string(),
          content: v.string(),
          placement: v.optional(
            v.union(
              v.literal("top"),
              v.literal("bottom"),
              v.literal("left"),
              v.literal("right")
            )
          ),
          action: v.optional(
            v.union(
              v.literal("click"),
              v.literal("hover"),
              v.literal("focus"),
              v.literal("none")
            )
          ),
        })
      )
    ),
    autoStart: v.optional(v.boolean()),
    showProgress: v.optional(v.boolean()),
    allowSkip: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const tour = await ctx.db.get(args.tourId);

    if (!tour) {
      throw new Error("Tour not found");
    }

    if (tour.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    const updates: any = {
      updatedAt: Date.now(),
    };

    if (args.name !== undefined) updates.name = args.name;
    if (args.tourIdString !== undefined) updates.tourId = args.tourIdString;
    if (args.steps !== undefined) updates.steps = args.steps;
    if (args.autoStart !== undefined) updates.autoStart = args.autoStart;
    if (args.showProgress !== undefined)
      updates.showProgress = args.showProgress;
    if (args.allowSkip !== undefined) updates.allowSkip = args.allowSkip;

    await ctx.db.patch(args.tourId, updates);

    return args.tourId;
  },
});

// Mutation to publish a tour
export const publishTour = mutation({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const tour = await ctx.db.get(args.tourId);

    if (!tour) {
      throw new Error("Tour not found");
    }

    if (tour.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    // Generate scriptId if not already published
    const scriptId = tour.scriptId || generateScriptId();

    await ctx.db.patch(args.tourId, {
      published: true,
      scriptId,
      updatedAt: Date.now(),
    });

    return scriptId;
  },
});

// Mutation to unpublish a tour
export const unpublishTour = mutation({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const tour = await ctx.db.get(args.tourId);

    if (!tour) {
      throw new Error("Tour not found");
    }

    if (tour.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.patch(args.tourId, {
      published: false,
      updatedAt: Date.now(),
    });

    return args.tourId;
  },
});

// Mutation to delete a tour
export const deleteTour = mutation({
  args: { tourId: v.id("tours") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const tour = await ctx.db.get(args.tourId);

    if (!tour) {
      throw new Error("Tour not found");
    }

    if (tour.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.tourId);

    return args.tourId;
  },
});
