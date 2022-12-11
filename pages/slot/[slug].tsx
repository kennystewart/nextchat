import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/dist/client/link";
import Faq from "../../components/faq";
import ProsCons from "../../components/ProsCons";
import LikeSlots from "../../components/LikeSlots";
import LikeCasinos from "../../components/LikeCasinos";
import Image from "next/legacy/image";
import Slider from "../../components/Slider";
import { useState } from "react";
import cheerio from "cheerio";
import {
  FaPercentage,
  FaAngleDown,
  FaAngleRight,
  FaCreativeCommonsPdAlt,
  FaCcMastercard,
} from "react-icons/fa";
import Head from "next/head";
import { FcBusinessman } from "react-icons/fc";
import { RiMailLine } from "react-icons/ri";
import { FcCurrencyExchange } from "react-icons/fc";
import { GrClose } from "react-icons/gr";
import Collapse from "../../components/Collapse";
import {
  AiFillLinkedin,
  AiOutlineCodepenCircle,
  AiOutlineExclamation,
} from "react-icons/ai";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import BonusItem from "../../components/BonusItem";
import { InferGetStaticPropsType } from "next";
import { CgMenuLeft } from "react-icons/cg";
import { PrismaClient } from "@prisma/client";
import SoftwareProv from "../../components/SoftwareProv";
const prisma = new PrismaClient();

export async function getStaticProps({ params }) {
  const slug = params.slug;
  const data = await prisma.casino_p_games.findFirst({
    where: { game_clean_name: slug },
    select: {
      game_name: true,
      game_image: true,
      meta: {
        select: {
          title: true,
          description: true,
        },
      },
      review: {
        select: {
          description: true,
        },
      },
      software: {
        select: {
          id: true,
          software_name: true,
        },
      },
      game_images: {
        select: {
          game_image_url: true,
          game_image_alt_text: true,
        },
      },
      slot_theme: {
        select: {
          theme: true,
        },
      },
    },
  });
  console.log(data);
  const swId = data.software.id;

  const gamedata = await prisma.$queryRawUnsafe(
    `SELECT s.software_name,g.game_name,g.game_clean_name,g.game_reels,g.game_lines,g.game_image FROM casino_p_games g
    
    LEFT JOIN casino_p_software s
    ON g.game_software = s.id
    LEFT JOIN casino_p_descriptions_games d
    ON g.game_id = d.parent
    WHERE game_software in (` +
      swId +
      `)
    AND d.description != ''  
    ORDER BY RANDOM ()
    LIMIT 5`
  );
  // Find 3 casinos that share the same software as the reviewd casino
  const casinodata: any[] = await prisma.$queryRawUnsafe(
    `SELECT c.id FROM casino_p_casinos c
    LEFT JOIN casino_p_software_link s 
    on s.casino = c.id
    WHERE s.software in (` +
      swId +
      `)
    ORDER BY RANDOM ()
    LIMIT 3`
  );

  const likeCasinoIds = casinodata.map((x) => x.id); // make a list of casinos that matched software

  const LikeCasinoData = await prisma.casino_p_casinos.findMany({
    where: {
      id: { in: likeCasinoIds },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      button: true,
      homepageimage: true,
      bonuses: {
        orderBy: {
          position: "desc",
        },
      },
    },
  });

  const bdata: any[] = LikeCasinoData.filter((p) => p.bonuses.length > 0);

  bdata.forEach(function (item, index) {
    let firstBonus = item.bonuses.find((v) => v.deposit > 0);
    let ndBonus = item.bonuses.find((v) => v.nodeposit > 0);
    item.nodeposit_type = "No Deposit";
    if (ndBonus) {
      item.nodeposit = ndBonus.nodeposit;
      item.nodepositplaythrough = ndBonus.playthrough;
      item.nodepositCode = ndBonus.code;
      if (ndBonus.code.length > 1) {
        item.ndCodeDisp = ndBonus.code;
      } else {
        item.ndCodeDisp = "No Code Used";
      }
      if (item.freespins > 0) {
        item.nodeposit_type = "Free Spins";
      }
    } else {
      item.ndCodeDisp = "No Code Used";
      item.nodeposit = 0;
      item.nodepositplaythrough = 0;
    }
    if (firstBonus) {
      item.deposit = firstBonus.deposit;
      item.depositBonus = firstBonus.deposit_amount;
      item.depositPlaythough = firstBonus.playthrough;
      item.depositCode = firstBonus.code;
      item.depositPercent = firstBonus.percent;
    } else {
      item.deposit = 0;
      item.depositBonus = 0;
      item.depositPlaythough = 0;
      item.depositCode = "No Bonus";
      item.depositPercent = 0;
    }
    if (item.depositCode.length > 1) {
      item.depCodeDisp = item.depositCode;
    } else {
      item.depCodeDisp = "No Code Used";
    }
    if (item.casino.length > 10) {
      item.casinoRevText = item.casino;
      item.casinoSiteText = "site";
    } else {
      item.casinoRevText = item.casino + " Review";
      item.casinoSiteText = "secure site";
    }

    delete item.bonuses;
  });

  data.review = data.review.map((entry) => {
    let desc = entry.description;
    const $ = cheerio.load(desc);
    $("p").addClass("my-4");
    $("h1").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h2").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h3").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h4").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h5").addClass("text-3xl font-semibold my-6 md:text-4xl");
    $("h6").addClass("text-3xl font-semibold my-6 md:text-4xl");
    return { description: $.html() };
  });
  const questions = ["what the hell", "Best casino really?"];
  const answers = [
    "Hell is the spot you dont want to visit in July",
    "Test this one is the actual best",
  ];
  const faq = { questions, answers };
  const pros = ["Fast payments", "Big jackpots", "No crime"];
  const cons = ["never pay", "slow"];
  const prosCons = { pros, cons };
  return { props: { data, gamedata, bdata, faq, prosCons } };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

const Review = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const faq = props.faq;
  const prosCons = props.prosCons;
  const [show, setShow] = useState(true);
  const data = props.data;
  const likeCasinoData = props.bdata;
  const gameList = props.gamedata;
  const gameReview = { __html: data.review[0].description };

  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white">
      <Header />
      <Head>
        <title>{data.meta[0]?.title ?? "Missing Title"}</title>
        <meta
          name="description"
          content={data.meta[0]?.description ?? "Missing Description"}
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
              <span>
                <Link href="../slot/">Reviews</Link>
              </span>
              <FaAngleRight />
              <span className="text-slate-500">{data.game_name}</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              {data.game_name} Slot Review 2022
            </h1>
            <div className="flex flex-col py-4">
              <span className="">
                Author:{" "}
                <a href="" className="font-medium ">
                  Barry Bridges
                </a>
              </span>
              <span className="text-sky-600 dark:text-white">
                June 13, 2022
              </span>
            </div>
            <div className="bg-slate-100 dark:bg-gray-200 dark:text-black rounded-xl mt-3">
              <div className="card p-4">
                <div className="heading flex items-center border-b gap-7 pb-4">
                  <button className="w-10 h-7 rounded bg-sky-700 dark:bg-zinc-800"></button>
                  <h2 className="text-lg">
                    Why you can trust{" "}
                    <span className="font-bold">allfreechips.com</span>
                  </h2>
                  <a href="#">
                    <i className="bi bi-info-circle"></i>
                  </a>
                </div>
                <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                  Allfreechips is dedicated to bringing the best and latest
                  online casino bonus information. We rely on your input to
                  insure the casinos listed here are both correct and on the
                  level by leaving your reviews.
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
              <Link href="#bonusList">{data.game_name} Bonuses</Link>
            </span>

            <span>
              <Link href="#CasinoReview">{data.game_name} Review</Link>
            </span>
            <span>
              <Link href="#ProsCons">{data.game_name} Pros and Cons</Link>
            </span>
            <span>
              <Link href="#LikeCasinos">Casinos Like {data.game_name}</Link>
            </span>
            <span>
              <Link href="#LikeSlots">Slots at {data.game_name}</Link>
            </span>
            <span>
              <Link href="#faq">{data.game_name} FAQs</Link>
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
                <Link href="#bonusList">{data.game_name} Bonuses</Link>
              </span>

              <span>
                <Link href="#CasinoReview">{data.game_name} Review</Link>
              </span>
              <span>
                <Link href="#ProsCons">{data.game_name} Pros and Cons</Link>
              </span>
              <span>
                <Link href="#LikeCasinos">Casinos Like {data.game_name}</Link>
              </span>
              <span>
                <Link href="#LikeSlots">Slots at {data.game_name}</Link>
              </span>
              <span>
                <Link href="#faq">{data.game_name} FAQs</Link>
              </span>
            </div>
          </div>
          <div className="md:w-3/4  text-lg md:text-xl font-medium">
            <p className="py-4">AT A GLANCE</p>
            
          
            <div className="flex flex-col rounded-lg">
              <p className="py-4 font-bold my-4 md:my-8">
                MORE BONUSES AT {data.game_name} CASINO
              </p>


            </div>

            <div>
              <h1 id="CasinoReview" className="text-3xl font-semibold my-4">
                {data.game_name} Review
              </h1>
              <div
                className="text-lg font-normal"
                dangerouslySetInnerHTML={gameReview}
              ></div>
              <ProsCons data={prosCons} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  How {data.game_name} Casino compares to other online casinos
                </h3>
                <p id="LikeCasinos" className="my-4">
                  Casinos You Can Play The {data.game_name} Slot Machine At
                </p>
                <LikeCasinos data={likeCasinoData} />
              </div>
              <Faq data={faq} />
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Other slots you can play like {data.game_name} slot
                </h3>
              </div>
              <div id="LikeSlots">
                <LikeSlots data={gameList} />
                <p className="text-center my-8">Show More</p>
              </div>
              <div className="flex flex-col border border-gray-200 p-3 rounded-lg">
                <h5 className="text-base">ABOUT THE AUTHOR</h5>
                <div className="flex items-center">
                  <div>
                    <FcBusinessman className="text-6xl" />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-3xl">Barry Bridges</h5>
                    <div className="flex text-sm space-x-4 my-2">
                      <span className="flex items-center">
                        <RiMailLine />
                        Email
                      </span>
                      <span className="flex items-center">
                        <AiFillLinkedin />
                        Linkedin
                      </span>
                    </div>
                  </div>
                </div>
                <p className="my-6">
                  Dolor sit amet, consectetur adipiscing elit. Donec volutpat
                  elit vel tellus eleifend imperdiet. Donec consectetur urna sed
                  neque rhoncus dapibus. Aenean nunc erat, lobortis a ex
                  dignissim, scelerisque malesuada odio.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Review;
