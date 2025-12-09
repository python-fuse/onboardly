import { mutation } from "../../convex/_generated/server";
import { query } from "../../convex/_generated/server";

// Query all tours
export const listTours = query(async ({ db }) => {
  return await db.query("tours").collect();
});

// Add a new tour
export const addTours = mutation(async ({ db }, tour) => {
  return await db.insert("tours", tour);
});
