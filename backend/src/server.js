import app, { closeApp } from "./app.js";
import './config/db.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server started successfully on PORT: ${PORT}!`);
});

// Graceful shutdown on process signals
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await closeApp(server);
  process.exit(0);
});