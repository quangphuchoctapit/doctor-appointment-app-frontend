import React, { useState, useEffect } from 'react'
import Nav from '../Nav'
import { LuPencil, LuCalendarDays } from "react-icons/lu";
import { FaUser, FaBell } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { IoIosHeart } from "react-icons/io";
import { HiSpeakerWave } from "react-icons/hi2";
import { BiLogoFacebookCircle } from "react-icons/bi";
import { IoInformationCircle } from "react-icons/io5";
import { convertBase64 } from '../../utils/convertBase64';
import { editUserImage } from '../../service/userService'

const UserProfile = () => {
    const [image, setImage] = useState('')
    const handleUploadImage = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setImage(base64)
    }

    const uploadImage = async () => {
        let dataServer = await editUserImage({ email: 'admin@gmail.com', image: image })
        console.log('hcekc dataserver: ', dataServer)
    }

    useEffect(() => {
        uploadImage()
    }, [image])

    return (
        <>
            <Nav />
            {/* <div className={`w-32 h-32 bg-center bg-no-repeat bg-cover bg-[url('')]`}></div> */}
            <div className='w-full'>
                <div className="max-w-screen-lg w-full mx-auto">
                    <div className="max-w-screen-md md:mx-auto mx-3">
                        <div className="bg-gray-200 rounded-b-lg relative h-[300px] w-full mx-auto">
                            <div className="absolute bottom-[-60px] sm:bottom-[-80px] max-sm:right-0 max-sm:left-0 left-5 flex justify-start">
                                <div className="flex gap-5 items-end mx-auto">
                                    <form action="">
                                        <div className="bg-red-200 mx-auto rounded-full sm:w-44 sm:h-44 w-32 h-32 relative">
                                            <label htmlFor='editImage' className="absolute bottom-[-5px] right-[-5px] hover:duration-200 hover:bg-gray-200 cursor-pointer sm:bottom-0 sm:right-0 rounded-full flex justify-center items-center w-12 h-12 bg-white p-3 shadow-xl border-2">
                                                <LuPencil size={20} />
                                            </label>
                                            <input
                                                type="file" className='hidden'
                                                id='editImage'
                                                accept='.jpg, .png, .jpeg'
                                                onChange={e => handleUploadImage(e)}
                                            />
                                        </div>
                                    </form>
                                    <div className="sm:flex gap-2 hidden sm:flex-col">
                                        <h3 className='text-2xl font-semibold'>Name</h3>
                                        <p className='text-gray-500'>name@gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-24 flex flex-col items-center gap-1 sm:hidden">
                            <h3 className='text-xl font-semibold'>Name</h3>
                            <p className='text-gray-500'>name@gmail.com</p>
                        </div>
                        <div className="mt-12 sm:mt-32 flex flex-col md:flex-row md:gap-5 md:items-start items-center w-full gap-2 mb-24">
                            <div className="md:w-[50%] md:h-[200px] bg-red-300"></div>

                            <div className="md:w-[50%] w-full">
                                <div className="flex gap-4 items-center justify-between w-full rounded-lg shadow-md p-3 hover:duration-200 border hover:bg-gray-200 cursor-pointer text-primary-purple-200">
                                    <div className="flex gap-3 items-center">
                                        <div className=""><FaUser size={20} /></div>
                                        <div className="">Edit Profile</div>
                                    </div>
                                    <div className=""><FaChevronRight /></div>
                                </div>
                                <div className="flex gap-3 items-center justify-between w-full rounded-lg shadow-md p-3 hover:duration-200 border hover:bg-gray-200 cursor-pointer text-primary-purple-200">
                                    <div className="flex gap-3 items-center">
                                        <div className=""><FaBell size={20} /></div>
                                        <div className="">Notification</div>
                                    </div>
                                    <div className=""><FaChevronRight /></div>
                                </div>
                                <div className="flex gap-3 items-center justify-between w-full rounded-lg shadow-md p-3 hover:duration-200 border hover:bg-gray-200 cursor-pointer text-primary-purple-200">
                                    <div className="flex gap-3 items-center">
                                        <div className=""><LuCalendarDays size={20} /></div>
                                        <div className="">My Appointments</div>
                                    </div>
                                    <div className=""><FaChevronRight /></div>
                                </div>
                                <div className="flex gap-3 items-center justify-between w-full rounded-lg shadow-md p-3 hover:duration-200 border hover:bg-gray-200 cursor-pointer text-primary-purple-200">
                                    <div className="flex gap-3 items-center">
                                        <div className=""><IoIosHeart size={20} /></div>
                                        <div className="">Favorite</div>
                                    </div>
                                    <div className=""><FaChevronRight /></div>
                                </div>
                                <div className="flex gap-3 items-center justify-between w-full rounded-lg shadow-md p-3 hover:duration-200 border hover:bg-gray-200 cursor-pointer text-primary-purple-200">
                                    <div className="flex gap-3 items-center">
                                        <div className=""><HiSpeakerWave size={20} /></div>
                                        <div className="">Health Assessment</div>
                                    </div>
                                    <div className=""><FaChevronRight /></div>
                                </div>
                                <div className="flex gap-3 items-center justify-between w-full rounded-lg shadow-md p-3 hover:duration-200 border hover:bg-gray-200 cursor-pointer text-primary-purple-200">
                                    <div className="flex gap-3 items-center">
                                        <div className=""><IoInformationCircle size={20} /></div>
                                        <div className="">Help & Support</div>
                                    </div>
                                    <div className=""><FaChevronRight /></div>
                                </div>
                                <div className="flex gap-3 items-center justify-between w-full rounded-lg shadow-md p-3 hover:duration-200 border hover:bg-gray-200 cursor-pointer text-primary-purple-200">
                                    <div className="flex gap-3 items-center">
                                        <div className=""><BiLogoFacebookCircle size={20} /></div>
                                        <div className="">About Doctommy</div>
                                    </div>
                                    <div className=""><FaChevronRight /></div>
                                </div>
                                <div className="sm:flex hidden gap-3 items-center justify-between w-full bg-primary-purple-500 mt-3 rounded-lg shadow-md p-3 hover:duration-200 border hover:bg-primary-purple-200 cursor-pointer text-white">
                                    <div className="flex gap-3 items-center w-full">
                                        <div className="">Log out</div>
                                    </div>
                                    <div className=""><FaChevronRight /></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center sm:hidden">
                            <div className="bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 text-white rounded-xl p-3 w-full sm:max-w-[30%] md:max-w-[20%] font-bold mb-12 text-center">Log Out</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default UserProfile
