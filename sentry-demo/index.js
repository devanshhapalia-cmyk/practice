
const Sentry = require("@sentry/node");

// Initialize Sentry
Sentry.init({
  dsn: "https://a1803153b66dedf8ef3b5b9730b93690@o4510622056710144.ingest.us.sentry.io/4510622058676224",
  tracesSampleRate: 1.0, // demo only
});

console.log("Sentry demo started...");

// ---- USER & CONTEXT ----
Sentry.setUser({
  id: "101",
  email: "demo@sentry.io",
});

Sentry.setContext("demo_app", {
  env: "development",
  feature: "sentry-demo",
});

// ---- ERROR CAPTURE ----
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed!");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (err) {
  Sentry.captureException(err);
}

// ---- MANUAL LOG ----
Sentry.captureMessage("This is a custom log message from Node.js demo");

// ---- PERFORMANCE (NEW WAY) ----
Sentry.startSpan(
  {
    name: "slow-operation",
    op: "task",
  },
  async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Slow operation finished");
  }
);

// ---- UNHANDLED ERROR (AUTO CAPTURE) ----
setTimeout(() => {
  JSON.parse("{ invalid json }");
}, 3000);
