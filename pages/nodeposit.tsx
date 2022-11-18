import Head from "next/head";
import Casinos from "../components/Casinos";
import Image from "next/legacy/image";
import React from "react";
import Header from "../components/Header";
import HighRoller from "../components/HighRoller";
import { InferGetStaticPropsType } from "next";
import {
  FaAngleDown,
  FaBalanceScale,
  FaHandsWash,
  FaGifts,
  FaGift,
  FaArrowCircleRight,
} from "react-icons/fa";
import { TbBeach } from "react-icons/tb";
import Footer from "../components/Footer";
import Collapse from "../components/Collapse";
import { PrismaClient } from "@prisma/client";
import CasinoNoDeposit from "../components/CasinoNoDeposit";
const prisma = new PrismaClient();
export async function getStaticProps({ params }) {
  const data = await prisma.casino_p_casinos.findMany({
    where: { 
      approved: 1, 
      rogue: 0,
      bonuses: {
        some: {
          nodeposit: { gt: 0 }
        }
      }
     },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [
          {nodeposit: 'desc'},
          {deposit: 'desc'}
        ]
      }
    },
    orderBy:[
      {hot: 'desc'},
      {new: 'desc'},
    ],
    take: 5,
  });
  
  return { props: { data: data.filter((p) => p.bonuses.length > 0  ) } };
}

export default function Nodeposit(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const bdata = props.data;
  return (
    <div>
      <Head>
        <title>No Deposit Casinos</title>
        <meta name="description" content="No deposit casino bonuses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white">
        <Header />
        <div className="md:px-24 py-8 text-center mt-28 p-2">
          <h1 className="text-3xl font-semibold px-8 md:text-6xl md:">
            Complete No Deposit Casino Guide
          </h1>
          <p className="py-6 font-medium md:text-xl md:my-10">
            Allfreechips is a top teir provider of exclusive no deposit casino bonuses allowing you to get the largest no deposit play with no deposit required.
          </p>
        </div>
        <CasinoNoDeposit data={bdata} />

        <div className="text-left p-4 md:container mx-auto">
          <h3 className="text-2xl font-semibold md:text-5xl md:my-12">
            Allfreechips - No Deposit online casino bonuses
          </h3>
          <p className="text-base font-medium my-6 text-justify  md:text-2xl">
            All About NDB
          </p>

          <div className="md:px-60">
            <hr className="border-sky-700 dark:border-white" />
            <Collapse />
            <hr className="border-sky-700 dark:border-white" />
            <Collapse />
            <hr className="border-sky-700 dark:border-white" />
            <Collapse />
            <hr className="border-sky-700 dark:border-white" />
            <Collapse />
          </div>
        </div>
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
        <hr className="md:border md:mx-24 my-8" />
        <Footer />
      </div>
    </div>
  );
}
