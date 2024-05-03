import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createUser, loginUser } from "./routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/api/register", createUser);

app.post("/api/login", loginUser);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
