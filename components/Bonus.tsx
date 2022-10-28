import React from "react";
import Image from "next/legacy/image";
import lapander from "../public/images/lapander.png";
import { FaArrowCircleRight } from "react-icons/fa";

const Bonus = () => {
  return (
    <div className="border-2 flex flex-col rounded-xl p-2 my-3 py-6 md:px-6 md:flex-row md:justify-between md:my-6">
      <div className="flex items-center">
        <Image src={lapander} width={200} height={80} alt={"Lapander"} />
        <p className="flex items-center">
          <span className="text-4xl font-medium md:text-5xl">25</span>{" "}
          <span className="flex flex-col font-bold leading-4 text-left ml-3">
            FREE<span>SPINS</span>
          </span>{" "}
        </p>
      </div>
      <div className="flex p-8 items-center space-x-4">
        <span className="flex flex-col font-medium text-lg md:text-4xl">
          $0
          <span className="text-xs font-light md:text-base md:font-normal">
            Min. deposit
          </span>
        </span>
        <hr className="border h-14 border-sky-700 dark:border-white" />
        <span className="flex flex-col font-medium text-lg md:text-4xl md:px-4">
          50x
          <span className="text-xs font-light md:text-base md:font-normal">
            Playthrough
          </span>
        </span>
        <hr className="border h-14 border-sky-700 dark:border-white" />
        <span className="font-medium leading-4 md:text-2xl">Bonus details</span>
      </div>
      <div className="flex justify-center items-center bg-sky-700 text-white dark:bg-white dark:text-black py-2 rounded-xl text-lg font-medium md:my-8 md:px-28">
        Claim Now
        <FaArrowCircleRight className="mx-6" />
      </div>
    </div>
  );
};

export default Bonus;
