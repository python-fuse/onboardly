// convex/schema/tours.ts

export default {
  tours: {
    tourId: "string",
    steps: [
      {
        id: "string",
        targetSelector: "string",
        title: "string",
        content: "string",
        placement: "string?", // optional
        action: "string?",    // optional
      }
    ],
    autoStart: "boolean?",
    showProgress: "boolean?",
    allowSkip: "boolean?",
  }
};
