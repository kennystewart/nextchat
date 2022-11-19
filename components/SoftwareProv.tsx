import React from "react";
import Image from "next/legacy/image";
import { FcCurrencyExchange } from "react-icons/fc";
import { AiOutlineExclamation } from "react-icons/ai";

const SoftwareProv = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between md:justify-start md:space-x-4 p-4 items-center">
        <span className="bg-sky-700 dark:bg-zinc-800 w-7 h-7"></span>
        <h4>Game providers at {props.data.casinoname}</h4>
        <AiOutlineExclamation />
      </div>
      <hr className="m-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-8">
        {props.data.softwares.map(function (d, id) {
          return (
            <div key={d.id} className="flex items-center">
              <Image
                unoptimized // avoids getting charged
                width={175}
                height={100}
                alt={d.softwarelist.software_name}
                src={`https://www.allfreechips.com/image/software/${encodeURIComponent(
                  d.softwarelist.image
                )}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SoftwareProv;
