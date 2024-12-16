import app, { closeApp } from "./app.js";
import './config/db.js';

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Express on Vercel"));

const server = app.listen(PORT, () => {
  console.log(`Server started successfully on PORT: ${PORT}!`);
});

export {app};

// Graceful shutdown on process signals
process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await closeApp(server);
  process.exit(0);
});