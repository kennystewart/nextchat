import Link from "next/link";
import Post from "../../../../components/common/Post";
import {
  FaAngleRight,
  FaBalanceScale,
  FaGift,
  FaGifts,
  FaHandsWash,
} from "react-icons/fa";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="md:container mx-auto text-sky-700 dark:text-white">
      <div className="py-6 px-1 mt-28">
        <div className="container mx-auto">
          <div className="flex text-sm gap-1 font-medium  items-center md:gap-4">
            <span>
              <Link href="/">AFC Home</Link>
            </span>
            <FaAngleRight />
            <span>
              <Link href="/discussions">Discussions</Link>
            </span>
            <FaAngleRight />
            <span>Allfreechips Post</span>
          </div>
        </div>
      </div>
      <h1>POST ID:{params.id}</h1>
      <div><Post/></div>
     
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: params.id,
    description : "This page is all about post " + params.id,
  };
}
