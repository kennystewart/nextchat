"use client";
import { useState } from "react";

export default function MobileJump({ left, close }) {
  const [show, setShow] = useState(true);
  return (
    <>
      <div className="flex md:hidden justify-between bg-sky-700 px-4 py-2 items-center text-white dark:bg-white dark:text-black">
        <span className="font-medium">ON THIS PAGE</span>
        <span
          onClick={() => setShow(!show)}
          className="border-2 border-white dark:border-black p-2 flex items-center rounded px-4"
        >
          Jump to {left}
        </span>
      </div>
      <div
        className={`flex md:hidden flex-col w-full fixed p-4 rounded-t-2xl justify-between z-20 bg-white dark:bg-zinc-800  text-2xl font-medium ${
          show ? "bottom-[-490px]" : "bottom-0"
        }`}
      >
        <div className="flex justify-between w-full items-center">
          <div>ON THIS PAGE</div>
          <div onClick={() => setShow(!show)} className="">
            {close}
          </div>
        </div>
        <hr className="border-1 my-4 border-sky-700 dark:border-white" />
        <div className="flex flex-col font-normal text-lg space-x-2 space-y-4">
          <span className="font-medium border-l-2 px-4 border-sky-700 dark:border-white">
            Our top picks
          </span>
          <span>
            <a href="#ProsCons">No Deposit Pros and Cons</a>
          </span>
          <span>
            <a href="#faq">No Deposit Bonus FAQs</a>
          </span>
        </div>
      </div>
    </>
  );
}
