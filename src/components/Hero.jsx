import Search from './Search'
import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col items-center p-10 py-[35px] gap-[20px] h-[500px] w-full bg-[#eef0fc]'>
      <h2 className='text-lg'>Find cars for sale and for rent near you</h2>
      <h2 className='text-[40px] font-bold'>Find Your Dream Car</h2>

      <Search />
      <img src="/tesla.png" alt="" className='mt-[7px] w-[60%]' />
    </div>
  )
}

export default Hero
