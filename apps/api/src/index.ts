import { createServer } from "node:http";
import express, { Express, Request, Response } from "express";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { createUser, loginUser, verifyToken } from "./routes";
import { onConnection } from "./socket-routes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
app.use(cors());
app.use(express.json());
const server = createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.post("/api/register", createUser);
app.post("/api/login", loginUser);
app.post("/api/verify-token", verifyToken);

io.on("connection", onConnection);
io.on("join-room", ({ socket, room }: { socket: Socket; room: string }) => {
  socket.join(room);
  console.log(`User joined room: ${room}`);
});

server.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
