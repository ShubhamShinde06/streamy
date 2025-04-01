import React from 'react'
import { FaInstagram } from 'react-icons/fa'
import { CiFacebook } from "react-icons/ci";
import { IoLogoYoutube } from 'react-icons/io';
import { FiDownload } from 'react-icons/fi';

const Footer = () => {
  return (
    <div className='w-full h-full lg:h-1/5 2xl:h-1/6 border-t grid lg:grid-cols-3 grid-cols-1 border-gray-400 pl-2 lg:pl-0 lg:pt-10 pt-5 mt-5'>
        <div className='w-full text-[#adafb0] lg:block lg:h-0 h-20 flex items-center'>
            @2025, Showing Movies And Web Shows <br />
            All Content Upload Other Resources <br/>
        </div>
        <ul className='w-full  flex  gap-3 lg:justify-center lg:h-0 h-20 items-center justify-start'>
            <li>Home</li> |
            <li>Movies</li> |
            <li>Shows</li>
        </ul>
        <div className='flex flex-col gap-4 justify-between lg:items-end  h-20 items-start'>
            <div className=' w-50 h-10 rounded-md border flex items-center justify-center gap-3'>
            <FiDownload />Download App
            </div>
            <div className=' flex items-center gap-4 pl-1'>
            <FaInstagram />
            <CiFacebook />
            <IoLogoYoutube />
            </div>
        </div>
    </div>
  )
}

export default Footer