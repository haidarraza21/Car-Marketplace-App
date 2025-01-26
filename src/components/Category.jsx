import React from 'react'
import Data from '@/Shared/Data'

const Category = () => {
  return (
    <div className='mt-20'>
      <h2 className='font-bold text-3xl text-center mb-6'>Browse By Type </h2>

      <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 px-20 ' >
        {Data.Category.map((caterory, index) => (
          <div key={index} className='border rounded-xl p-3 items-center flex flex-col hover:shadow-md cursor-pointer'>
            <img src={caterory.icon} width={35} height={35} alt="" />
            <h2 className='mt-2'>{caterory.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Category