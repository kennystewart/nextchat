import React from "react";
import Oakcasino from "./Oakcasino";

function LikeSlots(props) {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
      <Oakcasino
        classs={
          "flex flex-col items-center w-full md:w-1/3 border border-gray-200 shadow-md space-y-4 py-6 rounded-xl"
        }
      />
      <Oakcasino
        classs={
          "hidden md:flex flex-col items-center w-full md:w-1/3 border border-gray-200 shadow-md space-y-4 py-6 rounded-xl"
        }
      />
      <Oakcasino
        classs={
          "hidden md:flex flex-col items-center w-full md:w-1/3 border border-gray-200 shadow-md space-y-4 py-6 rounded-xl"
        }
      />
    </div>
  );
}
export default LikeSlots;
