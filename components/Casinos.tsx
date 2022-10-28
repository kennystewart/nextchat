import React from 'react'
import Casino from './Casino'
import { FaMedal } from 'react-icons/fa'
import { GiUsaFlag } from 'react-icons/gi'
import { SiBitcoinsv } from 'react-icons/si'
import { RiGameFill } from 'react-icons/ri'
import { BiNotepad } from 'react-icons/bi'

const Casinos = () => {
  return (
    <div className='md:px-24 py-8 text-center mt-28 p-2'>
        <h2 className='text-3xl font-semibold px-8 md:text-6xl md:'>Helping you find the right online casino</h2>
        <p className='py-6 font-medium md:text-xl md:my-10'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat elit vel tellus eleifend imperdiet.</p>
        <div className='grid grid-cols-2 md:grid md:grid-cols-4'>
            <Casino icon={<FaMedal className='text-4xl' />} title={'Best Online Casinos'} />
            <Casino icon={<GiUsaFlag className='text-4xl' />} title={'USA Online Casinos'} />
            <Casino icon={<SiBitcoinsv className='text-4xl' />} title={'Bitcoin USA Casinos'} />
            <Casino icon={<RiGameFill className='text-4xl' />} title={'No Deposit Casinos'} />
            <Casino icon={<FaMedal className='text-4xl' />} title={'Free Spins Casinos'} />
            <Casino icon={<BiNotepad className='text-4xl' />} title={'Casinos by Software'} />
            <Casino icon={<FaMedal className='text-4xl' />} title={'Free Spins Casinos'} />
            <Casino icon={<BiNotepad className='text-4xl' />} title={'Casinos by Software'} />
        </div>
    </div>
  )
}

export default Casinos
