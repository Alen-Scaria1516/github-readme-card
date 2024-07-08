import express, { Express, Request, Response } from "express";
import gitHubStats from "./api";

const app: Express = express();
const port = process.env.PORT || 8000;

app.use('/api',gitHubStats);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});