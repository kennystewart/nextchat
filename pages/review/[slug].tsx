import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LikeSlots from "../../components/LikeSlots";
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
import Bandits from "../../components/Bandits";
import BonusItem from "../../components/BonusItem";
import Oakcasino from "../../components/Oakcasino";
import { InferGetStaticPropsType } from "next";
import { CgMenuLeft } from "react-icons/cg";
import { PrismaClient } from "@prisma/client";
import SoftwareProv from "../../components/SoftwareProv";
const prisma = new PrismaClient();

export async function getStaticProps({ params }) {
  const slug = params.slug;

  const data = await prisma.casino_p_casinos.findFirst({
    where: { clean_name: slug },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      button: true,
      meta: true,
      homepageimage: true,
      bonuses: {
        orderBy: {
          position: "desc",
        },
      },
      banklist: {
        select: {
          bank_data: true,
        },
      },
      review: {
        select: {
          description: true,
        },
        orderBy: {
          ordered: "desc",
        },
      },
      softwares: {
        select: {
          softwarelist: true,
        },
      },
    },
  });

  const gamedata = await prisma.$queryRawUnsafe(
    `SELECT game_name,game_clean_name,game_reels,game_lines,game_image FROM casino_p_games 
    WHERE game_software in (1,2)
    ORDER BY RANDOM ()
    LIMIT 5`
  );

  data.review = data.review.map((entry) => {
    let desc = entry.description;
    const $ = cheerio.load(desc);
    $("p").addClass("my-4");
    return { description: $.html() };
  });

  return { props: { data, gamedata } };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

const Review = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const firstBonus = props.data.bonuses.find((v) => v.deposit > 0);

  const [show, setShow] = useState(true);
  const data = props.data;
  const casinoReview = { __html: data.review[0].description };
  const buttondata = data.button;
  const bonuslist = data.bonuses;
  const casinoname = data.casino;
  const softwares = data.softwares;
  const softwaredata = { casinoname, softwares };
  const bonusdata = { buttondata, bonuslist, casinoname };
  const Homepage =
    "https://www.allfreechips.com/image/games/" + data.homepageimage;
  return (
    <div className="bg-white text-sky-700 dark:bg-zinc-800 dark:text-white">
      <Header />
      <Head>
        <title>{data.meta[0]?.title ?? "Missing Title"}</title>
        <meta
          name="description"
          content={data.meta[0]?.description ?? "Missing Description"}
        />
        <meta property="og:image" content={Homepage} />
      </Head>
      <div className="md:container mx-auto text-sky-700 dark:text-white">
        <div className="py-6 px-1 mt-28">
          <div className="container mx-auto">
            <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
              <span>
                <a href="#">Online Casinos</a>
              </span>
              <FaAngleRight />
              <span>
                <a href="#">Reviews</a>
              </span>
              <FaAngleRight />
              <span className="text-slate-500">{data.casino}</span>
            </div>
          </div>
        </div>

        <section className="py-8  px-6">
          <div className="container mx-auto">
            <h1 className="text-4xl md:text-5xl font-semibold border-b border-blue-800 dark:border-white pb-12">
              {data.casino} Casino Review 2022
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
            <span>What is a bitcoin casino</span>
            <span>What is a bitcoin casino</span>
            <span>What is a bitcoin casino</span>
            <span>What is a bitcoin casino</span>
            <span>What is a bitcoin casino</span>
            <span>What is a bitcoin casino</span>
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
              <span>{data.casino} Bonuses</span>
              <span>{data.casino} Review</span>
              <span>{data.casino} Pros and Cons</span>
              <span>Casinos Like {data.casino} Bonuses</span>
              <span>Slots at {data.casino}</span>
            </div>
          </div>
          <div className="md:w-3/4  text-lg md:text-xl font-medium">
            <p className="py-4">AT A GLANCE</p>
            <div className="flex flex-col md:flex-row items-center md:space-x-16">
              <Image
                src={Homepage}
                width={440}
                height={300}
                alt={props.data.homepageimage}
              />
              <div className="flex flex-col w-full py-8">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="text-3xl font-medium items-center w-full">
                    {props.data.casino}
                  </div>
                  <div className="flex w-full justify-between md:justify-start my-4">
                    <div className="flex items-center space-x-2">
                      <span className="flex">
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                        <BsFillStarFill />
                      </span>
                      <span>4.1</span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="flex items-center">Review</span>
                      <span className="h-8 w-8 rounded-full bg-sky-700 text-white dark:bg-zinc-800 dark:text-white">
                        <AiOutlineExclamation className="relative top-2 left-2" />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center md:items-end md:flex-row">
                  <div>Top Offer</div>
                  <div className="flex items-center">
                    <span className="text-5xl">{firstBonus?.deposit} </span>
                    <div className="flex flex-col space-y-0 leading-4 text-base">
                      <span>
                        %
                        {(
                          (firstBonus?.deposit /
                            (firstBonus?.deposit_amount || 1)) *
                          100
                        ).toFixed(0)}
                      </span>
                      <span>Bonus</span>
                    </div>
                  </div>
                  <div className="font-normal">
                    up to ${firstBonus?.deposit_amount}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row space-y-8">
                  <div className="flex items-center mt-4 w-full">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">$10</span>
                      <span className="text-sm font-light">Min. Deposit</span>
                    </div>
                    <hr className="border-sky-200 w-10 h-1 rotate-90" />
                    <div className="flex flex-col items-center">
                      <span className="text-2xl">
                        {firstBonus?.playthrough}
                      </span>
                      <span className="text-sm font-light">Playthrough</span>
                    </div>
                    <hr className="border-sky-200 w-10 h-1 rotate-90" />
                    <div className="flex flex-col items-center">
                      <span className="text-sm">Bonus</span>
                      <span className="text-sm">details</span>
                    </div>
                  </div>
                  <button className="bg-sky-700 text-white dark:text-white dark:bg-zinc-800 flex w-full justify-center rounded-lg items-center h-14">
                    Claim Now
                    <BsArrowRightCircleFill className="mx-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg">
              <p className="py-4 font-bold my-4 md:my-8">
                MORE BONUSES AT {data.casino} CASINO
              </p>
              <LikeSlots data={props.gamedata} />
              <BonusItem data={bonusdata} />
              <span className="text-2xl text-center py-2 md:py-6">
                Show more
              </span>
            </div>
            <div className=" bg-sky-100 dark:bg-gray-200 dark:text-black">
              <SoftwareProv data={softwaredata} />
              <div className="flex flex-col">
                <div className="flex justify-between md:justify-start md:space-x-4 items-center">
                  <span className="bg-sky-700 dark:bg-zinc-800 w-7 h-7"></span>
                  <h4>Payment methods at {data.casino}</h4>
                  <AiOutlineExclamation />
                </div>
                <hr className="m-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-8">
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                  <div className="flex items-center">
                    <AiOutlineCodepenCircle className="text-2xl" />
                    Netent
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold my-4">
                {data.casino} Review
              </h1>
              <div
                className="text-lg font-normal"
                dangerouslySetInnerHTML={casinoReview}
              ></div>
              <div className="flex flex-col bg-slate-100 dark:text-black m-2 p-6 rounded-2xl md:flex-row md:justify-start font-normal">
                <div className="md:mx-10">
                  <h3 className="text-3xl font-semibold my-4">Pros</h3>
                  <ul className="text-justify list-disc md:space-x-0 space-y-4 ">
                    <li>
                      <span className="font-medium">Lorem ipsum:</span> dolor
                      sit amet, consectetur adipiscing elit. Donec volutpat elit
                      vel tellus eleifend imperdiet. Donec consectetur urna sed
                      neque rhoncus dapibus. Aenean nunc erat, lobortis a ex
                      dignissim, scelerisque malesuada odio. Sed vestibulum
                      dictum eleifend¢
                    </li>
                    <li>
                      <span className="font-medium">Lorem ipsum:</span> dolor
                      sit amet, consectetur adipiscing elit. Donec volutpat elit
                      vel tellus eleifend imperdiet. Donec consectetur urna sed
                      neque rhoncus dapibus. Aenean nunc erat, lobortis a ex
                      dignissim, scelerisque malesuada odio. Sed vestibulum
                      dictum eleifend¢
                    </li>
                    <li>
                      <span className="font-medium">Lorem ipsum:</span> dolor
                      sit amet, consectetur adipiscing elit. Donec volutpat elit
                      vel tellus eleifend imperdiet. Donec consectetur urna sed
                      neque rhoncus dapibus. Aenean nunc erat, lobortis a ex
                      dignissim, scelerisque malesuada odio. Sed vestibulum
                      dictum eleifend¢
                    </li>
                  </ul>
                </div>
                <div className="md:mx-20">
                  <h3 className="text-3xl font-semibold my-4">Cons</h3>
                  <ul className="text-justify list-disc md:space-x-0 space-y-4 ">
                    <li>
                      <span className="font-medium">Lorem ipsum:</span> dolor
                      sit amet, consectetur adipiscing elit. Donec volutpat elit
                      vel tellus eleifend imperdiet. Donec consectetur urna sed
                      neque rhoncus dapibus. Aenean nunc erat, lobortis a ex
                      dignissim, scelerisque malesuada odio. Sed vestibulum
                      dictum eleifend¢
                    </li>
                    <li>
                      <span className="font-medium">Lorem ipsum:</span> dolor
                      sit amet, consectetur adipiscing elit. Donec volutpat elit
                      vel tellus eleifend imperdiet. Donec consectetur urna sed
                      neque rhoncus dapibus. Aenean nunc erat, lobortis a ex
                      dignissim, scelerisque malesuada odio. Sed vestibulum
                      dictum eleifend¢
                    </li>
                  </ul>
                </div>
              </div>
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl">
                  {data.casino} Player Protection Measures
                </h3>
                <p className="my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  volutpat elit vel tellus eleifend imperdiet. Donec consectetur
                  urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a
                  ex dignissim, scelerisque malesuada odio. Sed vestibulum
                  dictum eleifend.
                </p>
                <p className="my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  volutpat elit vel tellus eleifend imperdiet. Donec consectetur
                  urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a
                  ex dignissim, scelerisque malesuada odio. Sed vestibulum
                  dictum eleifend. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Donec volutpat elit vel tellus eleifend
                  imperdiet. Donec consectetur urna sed neque rhoncus dapibus.
                  Aenean nunc erat, lobortis a ex dignissim, scelerisque
                  malesuada odio. Sed vestibulum dictum eleifend.
                </p>
                <Slider />
              </div>
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl">
                  {data.casino} Player Protection Measures
                </h3>
                <p className="my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  volutpat elit vel tellus eleifend imperdiet. Donec consectetur
                  urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a
                  ex dignissim, scelerisque malesuada odio. Sed vestibulum
                  dictum eleifend.
                </p>
                <p className="my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  volutpat elit vel tellus eleifend imperdiet. Donec consectetur
                  urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a
                  ex dignissim, scelerisque malesuada odio. Sed vestibulum
                  dictum eleifend. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Donec volutpat elit vel tellus eleifend
                  imperdiet. Donec consectetur urna sed neque rhoncus dapibus.
                  Aenean nunc erat, lobortis a ex dignissim, scelerisque
                  malesuada odio. Sed vestibulum dictum eleifend.
                </p>
              </div>
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  How {data.casino} Casino compares to other online casino
                </h3>
                <p className="my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  volutpat elit vel tellus eleifend imperdiet. Donec consectetur
                  urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a
                  ex dignissim, scelerisque malesuada odio. Sed vestibulum
                  dictum eleifend
                </p>
                <p className="my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  volutpat elit vel tellus eleifend imperdiet. Donec consectetur
                  urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a
                  ex dignissim, scelerisque malesuada odio. Sed vestibulum
                  dictum eleifend.
                </p>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0">
                  <Oakcasino
                    classs={
                      "flex flex-col items-center w-full md:w-1/3 border border-gray-200 shadow-md space-y-4 py-6 rounded-xl"
                    }
                  />
                  <Oakcasino
                    classs={
                      "hidden md:flex flex-col items-center w-full md:w-1/3 border border-gray-200 shadow-md space-y-4 py-6 rounded-xl"
                    }
                  />
                  <Oakcasino
                    classs={
                      "hidden md:flex flex-col items-center w-full md:w-1/3 border border-gray-200 shadow-md space-y-4 py-6 rounded-xl"
                    }
                  />
                </div>
              </div>
              <div className="">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Frequently asked questions
                </h3>
                <hr className="border-sky-700 dark:border-white" />
                <Collapse />
                <hr className="border-sky-700 dark:border-white" />
                <Collapse />
                <hr className="border-sky-700 dark:border-white" />
                <Collapse />
                <hr className="border-sky-700 dark:border-white" />
                <Collapse />
              </div>
              <div className="text-lg font-normal">
                <h3 className="text-3xl font-semibold my-6 md:text-4xl md:my-10">
                  Slots you can play at {data.casino} Casino
                </h3>
                <p className="my-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                  volutpat elit vel tellus eleifend imperdiet. Donec consectetur
                  urna sed neque rhoncus dapibus. Aenean nunc erat, lobortis a
                  ex dignissim, scelerisque malesuada odio. Sed vestibulum
                  dictum eleifend.
                </p>
              </div>
              <div>
                <Bandits />
                <Bandits />
                <Bandits />
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
