import Link from "next/link";
import {
  FaAngleRight,
  FaBalanceScale,
  FaGift,
  FaGifts,
  FaHandsWash,
} from "react-icons/fa";
import { TbBeach } from "react-icons/tb";
import Author from "../../components/AboutAuthor";
import Faq from "../../components/faq";
import FaqJsonLD from "../../components/FaqJsonLDX";
import monthYear from "../../components/functions/monthYear";
import ProsCons from "../../components/ProsCons";
import MobileJump from "./MobileJump";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";

export default function DiscussionContent() {
  
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <FaqJsonLD data={faq} />
   
      <div className="py-6 px-1 mt-28">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="/">AFC Home</Link>
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
              <a href="#author" className="font-medium ">
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
      <MobileJump
        left={
          <CgMenuLeft className="text-white dark:text-black mx-2 text-xl" />
        }
        close={<GrClose className="dark:bg-white" />}
      />
      <section className="flex flex-col mx-4 md:flex-row">
        <div className="hidden lg:w-1/4 lg:flex lg:flex-col lg:">
          <span className="text-lg font-medium p-4">ON THIS PAGE</span>
          <hr className="border-sky-700 dark:border-white w-60" />
          <span className="my-4 px-4 border-l-4 font-medium border-sky-700 dark:border-white">
            Our top picks
          </span>
          <div className="my-4 flex flex-col space-y-4">
            <span>
              <a href="#ProsCons">No Deposit Pros and Cons</a>
            </span>
            <span>
              <a href="#faq">No Deposit Bonus FAQs</a>
            </span>
          </div>
        </div>
        <div className="lg:w-3/4  text-lg md:text-xl font-medium">
          <div className="flex flex-col rounded-lg">
            <p className="py-4 font-bold my-4 md:my-8">
              Full List of no deposit casino bonuses
            </p>
            {children}
          </div>

          <div>
            <div className="text-lg font-normal">
              No Deposit Casino Bonus information
            </div>
          </div>
        </div>
      </section>
      <div className="text-left p-4 mt-2 md:mx-24 md:text-2xl">
        <h3 className="text-2xl font-semibold md:text-5xl">
          Use our casino guide to get huge bonuses
        </h3>
        <p className="text-base font-medium my-6 text-justify md:text-2xl md:font-normal">
          At Allfreechips, you will find everything from lists of no deposit
          bonuses to free spin casino codes and money contests in one place. The
          bonus value may range from $5 to hundreds of dollars, depending on the
          casino you choose. For your convenience, we analyze the offers of all
          online gambling sites and provide you with the following:
        </p>
        <ul className="list-disc pl-4 font-normal">
          <li>bonus value;</li>
          <li>playthrough requirements;</li>
          <li>type of software used;</li>
          <li>comprehensive reviews and rates.</li>
        </ul>
      </div>
      <div className="flex flex-col m-4 bg-sky-100 dark:bg-gray-300 dark:text-black pt-4 pb-10 px-8 text-center rounded-xl md:mx-40">
        <p className="font-medium md:text-2xl">WE&apos;VE DONE THE HOMEWORK</p>
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
  );
}
