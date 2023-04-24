"use client";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import CasinoDisplayList from "../../components/CasinoDisplayList";

const NoDepositCasinoList = (props: NoDepositCasinoList) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [casinoData, setCasinoData] = useState<string[]>(props.bonus);
  useEffect(() => {
    pageNumber > 1 &&
      fetch(`/api/noDeposit/?pageNumber=${pageNumber}`)
        .then((res) => {
          if (!res.ok) {
            throw res;
          }
          return res.json();
        })
        .then((res) => setCasinoData([...casinoData, ...res.bonus]))
        .catch((err) => {});
  }, [pageNumber]);

  useEffect(() => {
    fetch(`/api/noDeposit/?pageNumber=${pageNumber}`)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((res) => setCasinoData(res.bonus))
      .catch((err) => {});
  }, []);
  return (
    <div>
      <CasinoDisplayList data={casinoData} />
      <div
        className="flex justify-center items-center text-xl font-medium md:text-3xl py-2 md:py-6 cursor-pointer"
        onClick={() => {
          setPageNumber(pageNumber + 1);
        }}
      >
        Show more
        <FaAngleDown className="mx-4 text-lg font-thin md:text-4xl" />
      </div>
    </div>
  );
};
interface NoDepositCasinoList {
  bonus: any;
}
export default NoDepositCasinoList;
