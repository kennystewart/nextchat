import Header from "../components/Header";
import monthYear from "../components/functions/monthYear";
import Footer from "../components/Footer";
import Link from "next/dist/client/link";
import Faq from "../components/faq";
import ProsCons from "../components/ProsCons";
import LikeSlots from "../components/LikeSlots";
import LikeCasinos from "../components/LikeCasinos";
import BonusFilter from "../components/functions/bonusfilter";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import Head from "next/head";
import { GrClose } from "react-icons/gr";
import { InferGetStaticPropsType } from "next";
import { CgMenuLeft } from "react-icons/cg";
import { PrismaClient } from "@prisma/client";
import Author from "../components/AboutAuthor";
const prisma = new PrismaClient();
export async function getStaticProps({ params }) {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      bonuses: { some: { deposit: { gt: 0 } } },
      OR: [
        {
          NOT: { casino_geo: { some: { country: "US", allow: 0 } } },
          casino_geo: { some: { allow: 0 } },
        },
        {
          casino_geo: { some: { allow: 1, country: "US" } },
        },
      ],
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
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { props: { data: bonus } };
}

const PageOut = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const [show, setShow] = useState(true);
  const data = props.data;
  // const likeCasinoData = props.bdata;
  // const gameList = props.gamedata;
  // const casinoname = likeCasinoData[0].casino;
  // const casinoid = likeCasinoData[0].id;
  // const casinoData = { casinoid, casinoname };
  // const gameListData = { gameList, casinoData };
  // const gameReview = { __html: data.review[0].description };
  const title = "Title";
  const content = "Content that relates to the title.";
  const pros = [
    { title, content },
    { title, content },
    { title, content },
  ];
  const cons = pros;
  const prosCons = { pros, cons };
  const question = "Are Bitcoin casinos safe?";
  const answer =
    "The question really does not have a good answer.  Bitcoin is the new preferred way of financing casino transactions, this does not have any impact on whether the casino is actually safe or not.  This is why you should only play at bitcoin casinos like the ones reviewed her at Allfreechips.";
  const faq = [{ question, answer }];
  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white">
      <Header />
      <Head>
        <title>
          Bitcoin Casinos :: Complete guide to playing online casinos that offer
          Bitcoin or other Crypto Currencies
        </title>
        <meta
          name="description"
          content="The new preferred way to play online casinos is with the use of Bitcoin or other mainstream crypto currencies.  Allfreechips has reviewed may Bitcoin casinos here."
        />
        <meta property="og:image" content={data.game_image} />
      </Head>
      <div className="md:container mx-auto text-sky-700 dark:text-white">
        <div className="py-6 px-1 mt-28">
          <div className="container mx-auto">
            <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
              <span>
                <Link href="../">AFC Home</Link>
              </span>
              <FaAngleRight />
              <span>Bitcoin Casinos</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              Best Bitcoin USA Casinos For {monthYear()}
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
                    <span className="font-bold">Bitcoin Casinos</span>
                  </h2>
                  <a href="#">
                    <i className="bi bi-info-circle"></i>
                  </a>
                </div>
                <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                  Bitcoin Casinos are the future of online gambling without
                  question. The speed and ease of using bitcoin is unmatched,
                  and very secure if you use your own wallet. With all the
                  negative news about Crypto Currency lately you should know all
                  these losses are from exchanges where you should not keep your
                  Bitcoin. Play safe online bitcoin casinos and store your
                  bitcoin in a local or offline wallet where YOU control the
                  keys.
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
              <Link href="#SlotReview"> Review</Link>
            </span>
            <span>
              <Link href="#ProsCons"> Pros and Cons</Link>
            </span>
            <span>
              <Link href="#LikeCasinos">Casinos With </Link>
            </span>
            <span>
              <Link href="#LikeSlots">Slots Like </Link>
            </span>
            <span>
              <Link href="#faq">FAQs</Link>
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
                <Link href="#SlotReview">Review</Link>
              </span>
              <span>
                <Link href="#ProsCons">Pros and Cons</Link>
              </span>
              <span>
                <Link href="#LikeCasinos">Casinos With</Link>
              </span>
              <span>
                <Link href="#LikeSlots">Slots Like</Link>
              </span>
              <span>
                <Link href="#faq"> FAQs</Link>
              </span>
            </div>
          </div>
          <div className="md:w-3/4  text-lg md:text-xl font-medium">
            <p className="py-4">AT A GLANCE</p>

            <div className="flex flex-col rounded-lg">
              <p className="py-4 font-bold my-4 md:my-8">Slot Details of the</p>
            </div>

            <div>
              <h1 id="SlotReview" className="text-3xl font-semibold my-4">
                Review
              </h1>
              <div className="text-lg font-normal">Lots O Text HERE</div>
              <ProsCons data={prosCons} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Find Online Casinos To Play
                </h3>
                <p id="LikeCasinos" className="my-4">
                  Casinos You Can Play The Slot Machine At
                </p>
              </div>
              <Faq data={faq} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Other slots you can play like slot
                </h3>
              </div>
              <div id="LikeSlots">
                <p className="text-center my-8">Show More</p>
              </div>
              <Author data={authorData} />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PageOut;
