import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import Nav from '../Nav'
import { FaLocationDot } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from 'react-redux';

const HomePage = () => {
    const user = useSelector(state => state.user.value)
    console.log('check user:', user)
    return (
        <div className='homepage-container'>
            <Nav />
            <div className="w-full">
                <div className="max-w-screen-lg mx-auto p-3">
                    <div className="flex justify-between items-center">
                        <div className="flex flex-col gap-5">
                            <p className='text-xl'>Location</p>
                            <div className='flex gap-2 items-center font-bold'>
                                <  FaLocationDot size={20} />
                                <p>Seatal, USA</p>
                            </div>
                        </div>
                        <div className="text-black p-3 rounded-lg border hover:duration-200 cursor-pointer group hover:bg-black  border-black">
                            <FaRegBell size={20} className='group-hover:text-white text-black' />
                        </div>
                    </div>
                    <input type="text" className='p-3 w-full rounded-xl my-3 bg-gray-100 text-black' placeholder='Search...' />
                    <div className="my-3">
                        <div className="w-full bg-primary-purple-150 rounded-md p-3">
                            <div className="flex flex-col p-3 gap-3 justify-center">
                                <h3 className='text-2xl font-bold'>Looking for specialist doctor?</h3>
                                <p>Upload a Prescription and Tell us what you need. We do the rest.</p>
                                <Link to='/all-doctors'>
                                    <button className='text-white bg-primary-purple-500 p-3 max-w-[30%] border border-primary-purple-200 rounded-lg hover:bg-primary-purple-200 hover:border-white hover:duration-200 font-bold'>Book Now</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
