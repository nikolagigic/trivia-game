import { io } from "..";
import { PLAYER_IDS, ROOMS } from ".";

const onFindMatch = (socket: string) => {
  PLAYER_IDS.push(socket);
  const playerCount = PLAYER_IDS.length;

  if (playerCount === 2) {
    console.log("Match found!");
    const [player1, player2] = PLAYER_IDS;
    const room = `${player1}-${player2}`;

    ROOMS.push(room);
    io.to(player1).emit("match-found", {
      room,
      opponentId: player2,
    });
    io.to(player1).socketsJoin(room);

    io.to(player2).emit("match-found", {
      room,
      opponentId: player1,
    });
    io.to(player2).socketsJoin(room);
  }
};

export default onFindMatch;
