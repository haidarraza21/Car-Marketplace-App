import React from 'react';
import PropTypes from 'prop-types';
import { Separator } from './ui/separator';
import { LuFuel } from 'react-icons/lu';
import { SiSpeedtest } from 'react-icons/si';
import { GiGearStickPattern } from 'react-icons/gi';
import { MdOpenInNew } from "react-icons/md";

const CarItem = ({ car }) => {
  const placeholderImage = 'https://via.placeholder.com/300x250';

  return (
    <div className="border rounded-xl shadow-md overflow-hidden bg-white relative">
      <span className="absolute top-2 left-2 bg-green-500 rounded-full text-xs text-white px-3 py-1">
        New
      </span>
      <img
        src={car?.image || placeholderImage}
        alt={car?.name || 'Default Car Image'}
        className="rounded-t-xl w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-black text-lg mb-2">
          {car?.name || 'Unknown Car'}
        </h2>
        <Separator />
        <div className="grid grid-cols-3 mt-5 gap-4">
          <div className="flex flex-col items-center text-center">
            <LuFuel className="text-lg mb-1 text-gray-600" />
            <h2 className="text-sm text-gray-700">{car?.miles || 'N/A'} mi</h2>
          </div>
          <div className="flex flex-col items-center text-center">
            <SiSpeedtest className="text-lg mb-1 text-gray-600" />
            <h2 className="text-sm text-gray-700">{car?.fuelType || 'N/A'}</h2>
          </div>
          <div className="flex flex-col items-center text-center">
            <GiGearStickPattern className="text-lg mb-1 text-gray-600" />
            <h2 className="text-sm text-gray-700">{car?.gearType || 'N/A'}</h2>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg text-gray-800">${car?.price || '0.00'}</h2>
          <a
            href={`/cars/${car?.id || '#'}`}
            className="text-primary text-sm flex gap-2 items-center hover:underline"
          >
            View Details <MdOpenInNew />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarItem;
