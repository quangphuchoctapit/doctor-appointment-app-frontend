import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import { getDoctorInfo } from '../../service/userService.js'
import Nav from '../Nav.jsx'
import { PiUsersThree } from "react-icons/pi";
import { FaMedal, FaStar } from "react-icons/fa";

const DetailDoctor = () => {
    const { id } = useParams()
    const [doctorId, setDoctorId] = useState('')
    const [doctorInfo, setDoctorInfo] = useState([])
    useEffect(() => {
        setDoctorId(id)

    }, [])
    useEffect(() => {
        const fetchDoctorInfo = async () => {
            let dataServer = await getDoctorInfo({ id: doctorId })
            if (dataServer && dataServer.data && dataServer.data.EC === 0) {
                setDoctorInfo(dataServer.data.DT)
            }
        }
        fetchDoctorInfo(doctorId)
    }, [doctorId])
    // console.log('check cocter infor', doctorInfo)
    return (
        <div>
            <Nav />
            <div className="max-w-screen-lg mx-auto ">
                <div className="flex flex-col gap-5 mx-auto w-full">
                    <div className="my-6 p-3 flex flex-col justify-center items-center mx-3">
                        <div className="flex sm:hidden flex-col gap-2 items-center justify-center">
                            <div className="w-[120px] h-[120px] rounded-lg mx-auto bg-red-200"></div>
                            <div className="text-primary-purple-500 text-xl font-semibold">{doctorInfo.doctorName}</div>
                            <div className="">{doctorInfo?.specialtyData?.specialtyName}</div>
                        </div>
                        <div className="hidden sm:flex justify-between items-center gap-3 shadow-xl border rounded-lg p-3 min-w-[664px]">
                            <div className="w-[150px] h-[150px] rounded-lg bg-red-200 "></div>
                            <div className="flex flex-col gap-2 ">
                                <p className="">{doctorInfo.doctorName}</p>
                                <p className="">{doctorInfo?.positionData?.positionName}</p>
                            </div>
                            <div className="flex-grow flex-row flex gap-4 p-12">
                                <p>{doctorInfo?.positionData?.positionName}</p>
                                <p >{doctorInfo?.specialtyData?.specialtyName}</p>
                                <p>{doctorInfo?.clinicData?.clinicName}</p>
                                <p>{doctorInfo?.locationData?.locationName}</p>

                            </div>
                            <div className="hidden lg:flex gap-3 ">
                                <div className=" p-3 flex gap-2 items-center rounded-xl min-w-[100px] min-h-[120px] justify-between">
                                    <h3 className='text-xl font-semibold'>1000+</h3>
                                    <p className='text-gray-400'>patients</p>
                                </div>
                                <div className=" p-3 flex gap-2 items-center rounded-xl min-w-[100px] min-h-[120px] justify-between">
                                    <h3 className='text-xl font-semibold'>10 Yrs+</h3>
                                    <p className='text-gray-400'>Experience</p>
                                </div>
                                <div className=" p-3 flex gap-2 items-center rounded-xl min-w-[100px] min-h-[120px] justify-between">
                                    <h3 className='text-xl font-semibold'>4.5</h3>
                                    <p className='text-gray-400'>Rating</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex lg:hidden gap-3 items-center justify-center  my-6">
                            <div className="shadow-xl border p-3 flex flex-col items-center rounded-xl sm:min-w-[100px]  max-w-[90px] min-h-[140px]  sm:min-h-[120px] justify-between">
                                <div className=' flex justify-center items-center'><PiUsersThree size={30} className='text-primary-purple-500' /></div>
                                <h3 className='text-xl font-semibold text-center'>1000+</h3>
                                <p className='text-gray-400'>patients</p>
                            </div>
                            <div className="shadow-xl border p-3 flex flex-col items-center rounded-xl sm:min-w-[100px]  max-w-[90px] min-h-[140px]  sm:min-h-[120px] justify-between">
                                <div className=' flex justify-center items-center'>< FaMedal size={30} className='text-primary-purple-500' /></div>
                                <h3 className='text-xl font-semibold text-center'>10 Yrs+</h3>
                                <p className='text-gray-400'>Experience</p>
                            </div>
                            <div className="shadow-xl border p-3 flex flex-col items-center rounded-xl sm:min-w-[100px]  max-w-[90px] min-h-[140px]  sm:min-h-[120px] justify-between">
                                <div className=' flex justify-center items-center'><FaStar size={30} className='text-primary-purple-500' /></div>
                                <h3 className='text-xl font-semibold text-center'>4.5</h3>
                                <p className='text-gray-400'>Ratings</p>
                            </div>
                        </div>
                        <div className="my-6 flex flex-col gap-5 w-[95%] lg:w-full md:w-[80%]">
                            <Link to={`/book-doctor/${id}`} className="my-6 md:max-w-[20%] text-center text-xl font-semibold cursor-pointer w-full rounded-xl bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 text-white p-3">Book Now</Link>
                        </div>
                        <div className="my-6 flex flex-col gap-5 w-[95%] lg:w-full md:w-[80%]">
                            <div className="flex flex-col gap-3 my-5">
                                <h3 className='text-2xl font-bold text-primary-purple-500'>About {doctorInfo.doctorName}</h3>
                                <p>{doctorInfo.description}</p>
                            </div>
                            <div className="flex flex-col gap-3 my-5">
                                <h3 className='text-2xl font-bold text-primary-purple-500'>Working time</h3>
                                <p>Mon - Sat (7:00 - 8:00)</p>
                            </div>
                            <div className="flex flex-col gap-3 my-5">
                                <div className='flex justify-between items-center'>
                                    <h3 className="font-bold text-2xl text-primary-purple-500">Reviews</h3>
                                    <p>See all</p>
                                </div>
                                <div className="flex flex-col gap-3 w-full">
                                    <div className="shadow-xl border rounded-lg p-3 flex gap-3 items-center">
                                        <div className="lg:w-[80px] lg:h-[80px] w-[50px] h-[50px] rounded-full border-2 border-green-200"></div>
                                        <div className="flex flex-col gap-3 border rounded-lg p-3">
                                            <h3 className='sm:text-xl text-lg font-semibold text-orange-700'>Reviewer's name</h3>
                                            <p>reviewer review</p>
                                        </div>
                                        <div className="flex-grow flex justify-end items-center gap-1">
                                            <span>3</span>
                                            <FaStar className='text-yellow-700' size={20} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default DetailDoctor
