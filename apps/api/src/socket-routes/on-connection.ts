import { Socket } from "socket.io";
import onFindMatch from "./on-find-match";

const onConnection = (socket: Socket) => {
  console.log("a user connected");
  socket.on("disconnect", (socket) => {
    console.log("user disconnected");
  });

  socket.on("find-match", onFindMatch);
};

export default onConnection;
