import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const http = httpRouter();

// Analytics endpoint for widget tracking
// Widget calls this at: https://colorless-poodle-381.convex.cloud/analytics
http.route({
  path: "/analytics",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    try {
      const body = await request.json();

      // Expected format from widget:
      // { tourId, eventType, timestamp, ...additionalData }
      const { tourId, eventType, timestamp, stepId, sessionId, ...data } = body;

      // Store analytics in database
      await ctx.runMutation(internal.analytics.trackEvent, {
        tourId,
        eventType,
        timestamp: timestamp ? new Date(timestamp).getTime() : Date.now(),
        stepId,
        sessionId,
        userAgent: request.headers.get("user-agent") || undefined,
      });

      // Return success response
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Allow from any origin
        },
      });
    } catch (error) {
      console.error("Analytics error:", error);
      return new Response(JSON.stringify({ error: "Invalid request" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }),
}); // Handle CORS preflight requests
http.route({
  path: "/analytics",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
});

export default http;
