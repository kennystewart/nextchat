import Head from "next/head";
import React from "react";
import Faq from "../components/faq";
import Header from "../components/Header";
import BonusFilter from "../components/functions/bonusfilter";
import { InferGetStaticPropsType } from "next";
import { FaBalanceScale, FaHandsWash, FaGifts, FaGift } from "react-icons/fa";
import { TbBeach } from "react-icons/tb";
import Footer from "../components/Footer";
import { PrismaClient } from "@prisma/client";
import CasinoNoDeposit from "../components/CasinoNoDeposit";
import Link from "next/dist/client/link";
import { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { FaAngleRight } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import monthYear from "../components/functions/monthYear";
import Author from "../components/AboutAuthor";
import ProsCons from "../components/ProsCons";
import LikeSlots from "../components/LikeSlots";
const prisma = new PrismaClient();
export async function getStaticProps({ params }) {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      bonuses: {
        some: {
          nodeposit: { gt: 0 },
          freespins: { lt: 1 },
        },
      },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [{ nodeposit: "desc" }, { deposit: "desc" }],
      },
    },
    orderBy: [{ hot: "desc" }, { new: "desc" }],
    take: 25,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { props: { data: bonus } };
}

export default function Nodeposit(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const title = "Title";
  const content = "Content that relates to the title.";
  const pros = [
    { title: "--", content },
    { title: title, content },
    { title, content },
  ];
  const cons = pros;
  const prosCons = { pros, cons };
  const question = "Are Bitcoin casinos safe?";
  const answer =
    "The question really does not have a good answer.  Bitcoin is the new preferred way of financing casino transactions, this does not have any impact on whether the casino is actually safe or not.  This is why you should only play at bitcoin casinos like the ones reviewed her at Allfreechips.";
  const faq = [{ question, answer }];
  const bdata = props.data;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const [show, setShow] = useState(true);
  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white">
      <Header />
      <Head>
        <title>No Deposit Casinos</title>
        <meta name="description" content="No deposit casino bonuses" />
        <link rel="icon" href="/favicon.ico" />
       <meta
      //    property="og:image"
      //    content={`https://www.allfreechips.com/image/software/${encodeURIComponent(
      //      data.image
      //    )}`}
        />
      </Head>
      <div className="md:container mx-auto text-sky-700 dark:text-white">
        <div className="py-6 px-1 mt-28">
          <div className="container mx-auto">
            <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
              <span>
                <Link href="../">AFC Home</Link>
              </span>
              <FaAngleRight />
              <span>No Deposit Casinos</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              Best No Deposit Casinos For {monthYear()}
            </h1>
            <div className="flex flex-col py-4">
              <span className="">
                Author:{" "}
                <a href="" className="font-medium ">
                  {author}
                </a>
              </span>
              <span className="text-sky-600 dark:text-white">{reviewDate}</span>
            </div>
            <div className="bg-slate-100 dark:bg-gray-200 dark:text-black rounded-xl mt-3">
              <div className="card p-4">
                <div className="heading flex items-center border-b gap-7 pb-4">
                  <button className="w-10 h-7 rounded bg-sky-700 dark:bg-zinc-800"></button>
                  <h2 className="text-lg">
                    Why you should play{" "}
                    <span className="font-bold">No Deposit Casinos</span>
                  </h2>
                  <a href="#">
                    <i className="bi bi-info-circle"></i>
                  </a>
                </div>
                <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                  Allfreechips is a top teir provider of exclusive no deposit
                  casino bonuses allowing you to get the largest no deposit play
                  with no deposit required.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="flex md:hidden justify-between bg-sky-700 px-4 py-2 items-center text-white dark:bg-white dark:text-black">
          <span className="font-medium">ON THIS PAGE</span>
          <span
            onClick={() => setShow(!show)}
            className="border-2 border-white dark:border-black p-2 flex items-center rounded px-4"
          >
            Jump to{" "}
            <CgMenuLeft className="text-white dark:text-black mx-2 text-xl" />
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
              <GrClose className="dark:bg-white" />
            </div>
          </div>
          <hr className="border-1 my-4 border-sky-700 dark:border-white" />
          <div className="flex flex-col font-normal text-lg space-x-2 space-y-4">
            <span className="font-medium border-l-2 px-4 border-sky-700 dark:border-white">
              Our top picks
            </span>

            <span>
              <Link href="#ProsCons"> No Deposit Pros and Cons</Link>
            </span>
            <span>
              <Link href="#faq">No Deposit Bonus FAQs</Link>
            </span>
          </div>
        </div>
        <section className="flex flex-col mx-4 md:flex-row">
          <div className="hidden md:w-1/4 md:flex md:flex-col md:">
            <span className="text-lg font-medium p-4">ON THIS PAGE</span>
            <hr className="border-sky-700 dark:border-white w-60" />
            <span className="my-4 px-4 border-l-4 font-medium border-sky-700 dark:border-white">
              Our top picks
            </span>
            <div className="my-4 flex flex-col space-y-4">
 
              <span>
                <Link href="#ProsCons">No Deposit Pros and Cons</Link>
              </span>
              <span>
                <Link href="#faq">No Deposit Bonus FAQs</Link>
              </span>
            </div>
          </div>
          <div className="md:w-3/4  text-lg md:text-xl font-medium">
            <div className="flex flex-col rounded-lg">
              <p className="py-4 font-bold my-4 md:my-8">
                Full List of no deposit casino bonuses
              </p>
              <CasinoNoDeposit data={bdata} />
            </div>

            <div>               
              <div className="text-lg font-normal">No Deposit Casino Bonus information</div>
              <ProsCons data={prosCons} />
              <Faq data={faq} />
              <Author data={authorData} />
            </div>
            
          </div>
        </section>
        <div className="text-left p-4 mt-2 md:mx-24 md:text-2xl">
          <h3 className="text-2xl font-semibold md:text-5xl">
            Use our casino guide to get huge bonuses
          </h3>
          <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
            At Allfreechips, you will find everything from lists of no deposit
            bonuses to free spin casino codes and money contests in one place.
            The bonus value may range from $5 to hundreds of dollars, depending
            on the casino you choose. For your convenience, we analyze the
            offers of all online gambling sites and provide you with the
            following:
          </p>
          <ul className="list-disc pl-4 font-normal">
            <li>bonus value;</li>
            <li>playthrough requirements;</li>
            <li>type of software used;</li>
            <li>comprehensive reviews and rates.</li>
          </ul>
        </div>
        <div className="flex flex-col m-4 bg-sky-100 dark:bg-gray-300 dark:text-black pt-4 pb-10 px-8 text-center rounded-xl md:mx-40">
          <p className="font-medium md:text-2xl">WE VE DONE THE HOMEWORK</p>
          <h4 className="text-2xl py-4 font-medium leading-8 md:text-4xl md:my-4">
            See our top player guides for online casinos
          </h4>
          <ul className="font-normal py-2 items-center text-lg md:flex md:justify-around md:text-2xl">
            <li className="flex justify-center items-center">
              <FaBalanceScale className="m-2" />
              Online Casino Banking
            </li>
            <li className="flex justify-center items-center">
              <FaHandsWash className="m-2" />
              New Online Slots
            </li>
            <li className="flex justify-center items-center">
              <TbBeach className="m-2" />
              RTG Slots Machines
            </li>
            <li className="flex justify-center items-center">
              <FaGifts className="m-2" />
              Microgaming Slots
            </li>
            <li className="flex justify-center items-center">
              <FaGift className="m-2" />
              Betsoft Slots
            </li>
          </ul>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
