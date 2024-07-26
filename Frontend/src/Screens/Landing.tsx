import React from "react";

const Landing = () => {
  return (
    <div>
      <div className="pt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex justify-center">
            <img src={"/chessboard.jpg"} alt="" className="max-w-md" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Play chess Online</h1>
            <div className="mt-4">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Play Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
