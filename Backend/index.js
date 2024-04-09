import express from "express";
import { rootrouter } from "./routes/index.js";
import cors from "cors";
const app = express();
const port = 3000;
app.use(cors())
// Middleware to parse JSON bodies
app.use(express.json());

app.use("/api/v1",rootrouter)

// Listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
