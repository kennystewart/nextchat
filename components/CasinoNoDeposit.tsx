import React from "react";
import Link from "next/dist/client/link";
import Image from "next/legacy/image";
import lapander from "../public/images/lapander.png";
import { FaStar } from "react-icons/fa";
import { FaCopyright } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
function CasinoNoDeposit(props) {
  const data = props.data;

  data.forEach(function (item, index) {
    let firstBonus = item.bonuses.find((v) => v.deposit > 0);
    let ndBonus = item.bonuses.find((v) => v.nodeposit > 0);
    item.nodeposit = ndBonus.nodeposit;
    item.nodeposit = ndBonus.playthrough;
    item.nodepositCode = ndBonus.code;
    item.deposit = firstBonus.deposit;
    item.depositBonus = firstBonus.deposit_amount;
    item.depositPlaythough = firstBonus.playthrough;
    item.depositCode = firstBonus.code;
    item.depositPercent = firstBonus.percent;
    console.log(item.bonuses)
  });


  console.log(data);
  return (
    <div>
      {data.map((d) => (
        <div
          key={d.id}
          className="border-1 border-2 items-center border-gray-300 p-6 rounded my-8 md:mx-80 md:p-12 md:rounded-xl md:flex md:justify-between"
        >
          <div className="flex items-center md:flex-col">
            <Image
              unoptimized // avoids getting charged
              alt={data.casino}
              width={110}
              height={88}
              src={`https://www.allfreechips.com/image/casinoiconscut/${encodeURIComponent(
                d.button
              )}`}
            />

            <div className="flex flex-col items-end md:flex-row md:items-center space-x-6">
              <p className="text-sm font-medium">Approved by experts</p>
              <div className="flex items-center space-x-1">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <p className="pl-3 font-medium">4.1</p>
                <FaCopyright />
              </div>
            </div>
          </div>
          <hr className="border-sky-700 dark:border-white" />
          <div className="flex items-center justify-between py-4 md:flex-col">
            <p className="">Deposit Bonus</p>
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                  {d.depositPercent}%{" "}
                  <span className="md:text-lg">
                    up to ${d.depositBonus}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <hr className="md:border md:h-14 border-sky-700 dark:border-white" />
          <div className="flex items-center justify-between py-4 md:flex-col">
            <p className="">No Deposit Bonus</p>
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="text-lg font-medium pr-3 md:flex flex-col md:text-4xl">
                  ${d.nodeposit}{" "}
                  <span className="md:text-lg">No Deposit</span>
                </p>
              </div>
            </div>
          </div>
          <hr className="border-sky-700 dark:border-white" />
          <div className="flex flex-col">
            <button className="flex rounded bg-sky-700 text-white dark:bg-white dark:text-black py-3 my-4 justify-center items-center font-bold md:px-8">
              Play Now
              <FaArrowCircleRight className="mx-2" />
            </button>
            <p className="text-sm font-normal">On {d.casino}’s secure site</p>
            <h5 className="text-normal font-medium">
              <Link href={`review/${encodeURIComponent(d.clean_name)}`}>
                {d.casino} Review
              </Link>
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
}
export default CasinoNoDeposit;
