import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Tours table
  tours: defineTable({
    userId: v.string(), // Clerk user ID
    name: v.string(), // Tour name for dashboard display
    tourId: v.string(), // Unique identifier for the tour (used in widget)
    scriptId: v.optional(v.string()), // Unique ID for embed script (generated on publish)
    steps: v.array(
      v.object({
        id: v.string(), // Unique step identifier
        targetSelector: v.string(), // CSS selector for target element
        title: v.string(), // Step title
        content: v.string(), // Step content/description
        placement: v.optional(
          v.union(
            v.literal("top"),
            v.literal("bottom"),
            v.literal("left"),
            v.literal("right")
          )
        ), // Tooltip position
        action: v.optional(
          v.union(
            v.literal("click"),
            v.literal("hover"),
            v.literal("focus"),
            v.literal("none")
          )
        ), // Interaction type
      })
    ),
    autoStart: v.optional(v.boolean()), // Auto-start the tour
    showProgress: v.optional(v.boolean()), // Show step progress
    allowSkip: v.optional(v.boolean()), // Allow skipping the tour
    published: v.boolean(), // Whether the tour is published
    createdAt: v.number(), // Timestamp
    updatedAt: v.number(), // Timestamp
  })
    .index("by_user", ["userId"])
    .index("by_tourId", ["tourId"])
    .index("by_scriptId", ["scriptId"]),

  // Analytics events table
  analytics: defineTable({
    tourId: v.string(), // Tour ID from widget
    eventType: v.string(), // Event type: "tour_started", "step_completed", "tour_completed", "tour_skipped"
    stepId: v.optional(v.string()), // Step ID if applicable
    timestamp: v.number(), // Event timestamp
    sessionId: v.optional(v.string()), // Optional session tracking
    userAgent: v.optional(v.string()), // Optional user agent
  })
    .index("by_tourId", ["tourId"])
    .index("by_eventType", ["eventType"])
    .index("by_timestamp", ["timestamp"]),
});
