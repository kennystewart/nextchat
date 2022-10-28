import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { AiOutlineExclamation } from "react-icons/ai";
import Image from "next/legacy/image";
//  display the top Offer on the casino Slug page
function TopOffer(props) {
  return props.data.bonuses?.map(function (d, id) {
    //Find big deposit bonus
    if (bonusSet == 0) {
      if (d.deposit) {
        var depositAmount = d.deposit;
        var bonusSet = 1;
        var depositBonus = d.deposit_amount;
        var depositPlay = d.playthrough;
        if (depositBonus) {
          var depositPercent = (depositAmount / depositBonus) * 100;
        }
        var depositCode = d.code;
      }
    }
    //Display Bonus
    <div className="flex flex-col md:flex-row items-center md:space-x-16">
      <Image
        src={props.Homepage}
        width={300}
        height={200}
        alt={props.data.homepageimage}
      />
      <div className="flex flex-col w-full py-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="text-3xl font-medium items-center w-full">
            {props.data.casino}
          </div>
          <div className="flex w-full justify-between md:justify-start my-4">
            <div className="flex items-center space-x-2">
              <span className="flex">
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
                <BsFillStarFill />
              </span>
              <span>4.1</span>
            </div>
            <div className="flex space-x-4">
              <span className="flex items-center">Review</span>
              <span className="h-8 w-8 rounded-full bg-sky-700 text-white dark:bg-zinc-800 dark:text-white">
                <AiOutlineExclamation className="relative top-2 left-2" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end md:flex-row">
          <div>Top Offer</div>
          <div className="flex items-center">
            <span className="text-5xl">{depositAmount} </span>
            <div className="flex flex-col space-y-0 leading-4 text-base">
              <span>%{depositPercent}</span>
              <span>Bonus</span>
            </div>
          </div>
          <div className="font-normal">up to ${depositBonus}</div>
        </div>
        <div className="flex flex-col md:flex-row space-y-8">
          <div className="flex items-center mt-4 w-full">
            <div className="flex flex-col items-center">
              <span className="text-2xl">$10</span>
              <span className="text-sm font-light">Min. Deposit</span>
            </div>
            <hr className="border-sky-200 w-10 h-1 rotate-90" />
            <div className="flex flex-col items-center">
              <span className="text-2xl">{depositPlay}x</span>
              <span className="text-sm font-light">Playthrough</span>
            </div>
            <hr className="border-sky-200 w-10 h-1 rotate-90" />
            <div className="flex flex-col items-center">
              <span className="text-sm">Bonus</span>
              <span className="text-sm">details</span>
            </div>
          </div>
          <button className="bg-sky-700 text-white dark:text-white dark:bg-zinc-800 flex w-full justify-center rounded-lg items-center h-14">
            Claim Now
            <BsArrowRightCircleFill className="mx-4" />
          </button>
        </div>
      </div>
    </div>;
  });
}
export default TopOffer;
