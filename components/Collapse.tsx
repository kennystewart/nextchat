import React, { useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

const Collapse = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex flex-col">
      <div className="flex p-4 font-medium text-lg items-center justify-between md:text-2xl">
        Is bitcoin gambling legal?
        <FaAngleDown
          className="mx-4 text-lg font-thin"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div className={`w-full p-4 text-base font-medium my-6 text-justify md:text-2xl ${open ? 'flex' : 'hidden'}`}>Online casinos have everything it takes to become more popular than land based ones, especially among those who are only starting their journey in the gambling world. That said, it may be too difficult to choose between hundreds of platforms to play with. If it is your case, it s time to leave all those worries to Allfreechips! We will provide you with the online casino guide and help you turn their promotional offers to your advantage.</div>
    </div>
  )
}

export default Collapse
