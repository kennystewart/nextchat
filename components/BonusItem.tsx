import React from "react";
import Image from "next/legacy/image";
import { BsArrowRightCircleFill } from "react-icons/bs";

function BonusItem(props) {
  const casinologo =
    "https://www.allfreechips.com/image/casinoiconscut/" +
    props.data.buttondata;
  const casinobonusalt = props.data.casinoname + " Casino Bonus";
  return (
    <div id="bonusList">
      {props.data.bonuslist?.map(function (d, id) {
        var infoLine = "$20";
        var infoLine2 = "Min. deposit";
        var bonusLink =
          "https://www.allfreechips.com/play_casino" + d.parent + ".html";
        if (d.code) {
          var infoLine = "" + d.code;
          var infoLine2 = "Bonus Code";
        }
        if (d.link) {
          var bonusLink = "" + d.link;
        }
        var bname = "Free";
        var bnameTwo = "Spins";
        var bonusValue = "" + d.freespins;

        if (d.nodeposit && !d.freespins) {
          var bname = "No Deposit";
          var bnameTwo = "Bonus";
          var bonusValue = "$" + d.nodeposit;
        }
        if (d.deposit) {
          var bname = "Match";
          var bnameTwo = "Bonus";
          var bonusValue = "$" + d.deposit;
        }
        return (
          <div
            key={d.id}
            className="flex flex-col border border-gray-200 my-4 px-6 py-2 rounded-md md:flex-row md:justify-between"
          >
            <div className="flex items-center my-2 md:space-x-6">
              <Image
                src={casinologo}
                alt={casinobonusalt}
                width="100"
                height="80"
              />
              <div className="flex text-5xl items-center">
                {bonusValue}
                <div className="flex flex-col">
                  <span className="text-sm">{bname}</span>
                  <span className="text-sm">{bnameTwo}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-1 items-center my-4">
              <div className="flex flex-col items-center">
                <span className="text-2xl">{infoLine}</span>
                <span className="text-xs font-light">{infoLine2}</span>
              </div>
              <hr className="border-sky-200 dark:border-white w-10 h-1 rotate-90" />
              <div className="flex flex-col items-center">
                <span className="text-2xl">{d.playthrough}x</span>
                <span className="text-xs font-light">Playthrough</span>
              </div>
              <hr className="border-sky-200 dark:border-white w-10 h-1 rotate-90" />
              <div className="flex flex-col items-center">
                <span>Bonus</span>
                <span>details</span>
              </div>
            </div>
            <a href={bonusLink} rel="noreferrer" target="_blank">
              <button className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center">
                Claim Now
                <BsArrowRightCircleFill className="mx-4" />
              </button>
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default BonusItem;
