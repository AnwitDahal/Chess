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
  const [board, setBoard] = useState(chess.board());
  const [started, setStarted] = useState(false);
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      switch (message.type) {
        case INIT_GAME:
          setBoard(chess.board());
          setStarted(true);
          break;
        case MOVE:
          const move = message.payload;
          chess.move(move);
          setBoard(chess.board());
          console.log("Move made");
          break;
        case GAME_OVER:
          console.log("Game over");
          break;
      }
    };
  }, [socket]);
  if (!socket) return <div className="text-white">Connecting....</div>;
  return (
    <div className=" justify-center flex">
      <div className="pt-8 max-w-screen-lg w-full">
        <div className="grid grid-cols-6 gap-4 w-full">
          <div className="col-span-4  w-full flex justify-center">
            <ChessBoard
              board={board}
              socket={socket}
              setBoard={setBoard}
              chess={chess}
            />
          </div>
          <div className="col-span-2 w-full flex justify-center bg-slate-900">
            <div className="pt-8">
              {!started && (
                <Button
                  onClick={() => {
                    socket.send(
                      JSON.stringify({
                        type: INIT_GAME,
                      })
                    );
                  }}
                >
                  Play
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
