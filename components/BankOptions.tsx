import React from "react";
import Image from "next/image";
import { AiOutlineExclamation } from "react-icons/ai";
const BankOptions = (props) => {
  const banks = props.data.bankListItems;
  const casino = props.data.casinoData.casinoname;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between md:justify-start md:space-x-4 items-center">
        <span className="bg-sky-700 dark:bg-zinc-800 w-7 h-7"></span>
        <h4>Payment methods at {casino}</h4>
        <AiOutlineExclamation />
      </div>
      <hr className="m-4" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-8">
        {banks.map(function (d, id) {
          return (
            <div className="flex items-center">
              <Image
                unoptimized // avoids getting charged
                width={d.bank_data.tw}
                height={d.bank_data.th}
                alt={d.bank_data.name}
                src={`https://www.allfreechips.com/image/banks/${encodeURIComponent(
                  d.bank_data.image
                )}`}
              />
              {d.bank_data.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BankOptions;
