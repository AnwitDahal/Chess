import React, { useEffect, useState } from "react";
import ChessBoard from "../Components/ChessBoard";
import Button from "../Components/Button";
import useSocket from "../Hook/useSocket";
import { Chess } from "chess.js";

export const INIT_GAME = "init_game";
export const MOVE = "move";
export const GAME_OVER = "game_over";

const Game = () => {
  const socket = useSocket();
  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(board.board());
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(new Chess());
          console.log("Game initialized");
          break;
        case MOVE:
          const move = message.payload;
          board.move(move);
          console.log("Move made");
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
  }, [socket]);
  return (
    <div className=" justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4 bg-red-200 w-full">
            <ChessBoard />
          </div>
          <div className="col-span-2 bg-green-200 w-full">
            <Button
              onClick={() => {
                socket.send(
                  JSON.stringify({
                    type: "INIT_GAME",
                  })
                );
              }}
            >
              Play
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
