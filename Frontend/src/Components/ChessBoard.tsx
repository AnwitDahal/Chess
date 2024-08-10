import { Color, PieceSymbol, Square } from "chess.js";
import React, { useState } from "react";
import { MOVE } from "../Screens/Game";

const ChessBoard = ({
  chess,
  board,
  socket,
  setBoard,
}: {
  chess: any;
  setBoard: any;
  board: ({
    square: Square;
    type: PieceSymbol;
    color: Color;
  } | null)[][];
  socket: WebSocket;
}) => {
  const [from, setFrom] = useState<null | Square>(null);
  const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const numbers = [8, 7, 6, 5, 4, 3, 2, 1];

  return (
    <div className="flex">
      <div className="flex flex-col text-white">
        {numbers.map((number, i) => (
          <div key={i} className="h-16 flex items-center justify-center mr-2">
            {number}
          </div>
        ))}
      </div>
      <div className="">
        {board.map((row, i) => {
          return (
            <div key={i} className="flex">
              {row.map((square, j) => {
                const squareRepresentation = (String.fromCharCode(
                  97 + (j % 8)
                ) +
                  "" +
                  (8 - i)) as Square;

                const isWhiteSquare = (i + j) % 2 === 0;
                const isSelectedSquare = from === squareRepresentation;
                const hasPiece = !!square;

                return (
                  <div
                    onClick={() => {
                      if (!from) {
                        setFrom(squareRepresentation);
                      } else {
                        socket.send(
                          JSON.stringify({
                            type: MOVE,
                            payload: {
                              move: {
                                from,
                                to: squareRepresentation,
                              },
                            },
                          })
                        );
                        setFrom(null);
                        chess.move({
                          from,
                          to: squareRepresentation,
                        });
                        setBoard(chess.board());
                      }
                    }}
                    key={j}
                    className={`w-16 h-16 ${
                      isWhiteSquare && hasPiece && isSelectedSquare
                        ? "bg-gray-400"
                        : hasPiece && isSelectedSquare
                        ? "bg-green-900"
                        : isWhiteSquare
                        ? "bg-white"
                        : "bg-green-700"
                    }`}
                  >
                    {/* className={`w-16 h-16 ${ isWhiteSquare && hasPiece && isSelectedSquare? "bg-gray-400": isWhiteSquare? "bg-white": "bg-green-700"}`}> */}{" "}
                    <div className="flex justify-center w-full h-full">
                      <div className="h-full flex justify-center flex-col">
                        {square ? (
                          <img
                            className=""
                            src={`/${
                              square?.color === "b"
                                ? square.type
                                : `${square?.type?.toUpperCase()}w`
                            }.svg`}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="flex">
          {letters.map((letter, i) => (
            <div
              key={i}
              className="w-16 h-8 flex items-center justify-center text-white"
            >
              {letter}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
