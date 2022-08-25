import React from 'react'
import Image from 'next/image'
import Laplander from '../public/images/lapander.png'
import { BsArrowRightCircleFill } from 'react-icons/bs'

const Lapilanders = () => {
  return (
    <div className="flex flex-col border border-gray-200 my-4 px-6 py-2 rounded-md md:flex-row md:justify-between">
      <div className="flex items-center my-2 md:space-x-6">
        <Image src={Laplander} alt={'Laplander'} />
        <div className="flex text-5xl items-center">
          25
          <div className="flex flex-col">
            <span className="text-sm">Free</span>
            <span className="text-sm">Spins</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-1 items-center my-4">
        <div className="flex flex-col items-center">
          <span className="text-2xl">$0</span>
          <span className="text-xs font-light">Min. deposit</span>
        </div>
        <hr className="border-sky-200 dark:border-white w-10 h-1 rotate-90" />
        <div className="flex flex-col items-center">
          <span className="text-2xl">50x</span>
          <span className="text-xs font-light">Playthrough</span>
        </div>
        <hr className="border-sky-200 dark:border-white w-10 h-1 rotate-90" />
        <div className="flex flex-col items-center">
          <span>Bonus</span>
          <span>details</span>
        </div>
      </div>
      <button className="bg-sky-700 text-white dark:bg-white dark:text-black px-10 py-3 rounded-lg my-6 flex items-center justify-center">Claim Now<BsArrowRightCircleFill className='mx-4' /></button>
    </div>
  )
}

export default Lapilanders
