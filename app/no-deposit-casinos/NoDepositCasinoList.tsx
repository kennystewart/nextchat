"use client";
import BonusFilter from "../../components/functions/bonusfilter";
import CasinoDisplayList from "../../components/CasinoDisplayList";
import { FaAngleDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

const NoDepositCasinoList = (props: NoDepositCasinoList) =>
  //
  //
  {
    const [pageNumber, setPageNumber] = useState<number>(1);

    const [casinoData, setCasinoData] = useState<string[]>(props.bonus);
    useEffect(() => {
      pageNumber > 1 &&
        axios
          .get(`/api/noDeposit/?pageNumber=${pageNumber}`)
          .then((res) => {
            res.status === 200 &&
              setCasinoData([...casinoData, ...res.data.bonus]);
          })
          .catch((err) => {});
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber]);

    useEffect(() => {
      axios
        .get(`/api/noDeposit/?pageNumber=${pageNumber}`)
        .then((res) => {
          res.status === 200 && setCasinoData(res.data.bonus);
        })
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
