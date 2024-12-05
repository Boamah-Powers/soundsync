import mongoose from "mongoose";
import app, { closeApp } from "./src/app.js";

let server;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DB_URI);
  server = app.listen(4000);
});

afterAll(async () => {
  await closeApp(server); 
});
