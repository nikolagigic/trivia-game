import { io } from "..";
import { PLAYER_IDS, ROOMS } from ".";

const onFindMatch = (socket: string) => {
  PLAYER_IDS.push(socket);
  const playerCount = PLAYER_IDS.length;

  if (playerCount === 2) {
    const room = `room-${ROOMS.length + 1}`;
    const opponentId = PLAYER_IDS[0] === socket ? PLAYER_IDS[1] : PLAYER_IDS[0];

    ROOMS.push(room);

    PLAYER_IDS.map((player) => {
      io.to(player).emit("match-found", { room, opponentId });
    });
  }
};

export default onFindMatch;
