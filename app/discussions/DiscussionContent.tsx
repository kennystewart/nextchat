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
   
      <div className="py-6 px-1 mt-28">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="/">AFC Home</Link>
            </span>
            <FaAngleRight />
            <span>Allfreechips Discussions</span>
          </div>
        </div>
      </div>
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
        <div>
          DISCUSS
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
