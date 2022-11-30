import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";
import Button from "./Button";
import Image from "next/image";

const LikeCasinos = (props) => {
  console.log(props);

  return (
    <div
    className="flex flex-col md:flex-row space-y-4 md:space-y-0"
  >
      {props.data.map((d) => (
          <div key={d.id} className="flex flex-col items-center w-full md:w-1/3 border border-gray-200 shadow-md space-y-4 py-6 rounded-xl">
            <Image src={`https://radiumpowered.com/radiumimages/homepage/${encodeURIComponent(d.clean_name)}-homescreen.jpg`}  height={500} width={312} alt={d.casinoname} />
            <span>{d.casino}</span>
            <span className="flex items-center">
              <BsFillStarFill />
              <BsFillStarFill />
              <BsFillStarFill />
              <VscStarEmpty />
              <VscStarEmpty />
              <span className="px-2">4.1</span>
            </span>
            <Button name={"Play Now"} />
            <hr className="w-full border-sky-700 dark:border-white h-0.5" />
            <span>Deposit Bonus</span>
            <span>{d.depositPercent}% up to ${d.depositBonus}</span>
            <hr className="w-full border-sky-700 dark:border-white h-0.5" />
            <span>No Deposit Bonus</span>
            <span>{d.nodeposit} {d.nodeposit_type}</span>
          </div>
        
      ))}
    </div>
  );
};

export default LikeCasinos;
