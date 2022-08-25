import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Lapilanders from '../public/images/lapp.png'

function Slider() {
  const [index, setIndex] = useState(0)

  const images = [
    './images/nitro.png',
    './images/hytro.png',
    './images/ritro.png',
    './images/titro.png',
    './images/mitro.png',
  ]
  useEffect(() => {
    setInterval(() => {
      setIndex((index + 1) % images.length)
    }, 5000)
  })
  if (index + 1 == images.length) {
    // index = 0;
  }
  // const handlePrev =() => {
  //     setIndex((index - 1) % images.length)
  // }
  // const handleNext =() => {
  //     setIndex((index + 1) % images.length)
  // }
  return (
    <>
      <div className="flex flex-col justify-between space-x-4 mt-16">
        <div className="flex">
          <div className="flex">
            <img
              className="absolute w-72 pr-2 md:pr-0 mt-2 ml-7 md:w-96 md:mt-4 md:ml-10"
              src={images[index]}
              alt="new"
            />
            <Image src={Lapilanders} width={470} height={280} alt="new" />
          </div>
          <div className="hidden md:flex">
            <img
              className="absolute w-72 pr-2 md:pr-0 mt-2 ml-7 md:w-96 md:mt-4 md:ml-10"
              src={images[index + 1]}
              alt="new"
            />
            <Image src={Lapilanders} width={470} height={280} alt="new" />
          </div>
        </div>
        {/* <div className="flex">
                        <button className="h-auto w-10 bg-yellow-800 font-extrabold text-3xl" onClick={handlePrev}>{"<"}</button>
                        <button className="h-auto w-10 bg-yellow-800 font-extrabold text-3xl" onClick={handleNext}>{">"}</button>
                    </div> */}
      </div>
    </>
  )
}
export default Slider
