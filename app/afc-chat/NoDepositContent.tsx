import Head from "next/head";
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
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";

export default function NoDepositContent({ children }) {

  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <Head>
        <meta
        //    property="og:image"
        //    content={`https://www.allfreechips.com/image/software/${encodeURIComponent(
        //      data.image
        //    )}`}
        />
      </Head>
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
    </div>
  );
}
