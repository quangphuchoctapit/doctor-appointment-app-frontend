import React, { useState, useEffect } from 'react'
import Nav from '../Nav.jsx'
import { MdOutlineVideocam } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { HiOutlineChat } from "react-icons/hi";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { getDoctorInfo } from '../../service/userService.js'
import { useParams, Link } from "react-router-dom";

const BookDoctor = () => {
    const { id } = useParams()
    const [doctorId, setDoctorId] = useState('')
    const [doctorInfo, setDoctorInfo] = useState({})
    const [availableTime, setAvailableTime] = useState([])
    const [isFirstRender, setIsFirstRender] = useState(true);


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

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        let availableTimeData = JSON.parse(doctorInfo.availableTime)
        setAvailableTime(availableTimeData)
    }, [doctorInfo])
    return (
        <>
            <Nav />
            <div className='w-full'>
                <div className="max-w-screen-lg mx-auto ">
                    <div className="flex flex-col gap-5 items-center md:items-start mx-3 my-6">
                        <div className="flex justify-between md:justify-center items-center w-full md:gap-16">
                            <div className="block md:hidden">back</div>
                            <div className="text-2xl font-semibold">New Appointment</div>
                            <div className="p-3 rounded-xl shadow-xl border cursor-pointer hover:duration-200 hover:bg-gray-200"><HiOutlineCalendarDays /></div>
                        </div>
                        <div className="flex flex-col items-center gap-5 md:flex-row w-full justify-between md:my-6">
                            <div className="rounded-lg shadow-xl border flex flex-col gap-2 p-3 w-full bg-white md:max-w-[50%]">
                                <h3 className="text-xl font-semibold block overflow-x-auto">Date</h3>
                                <div className="flex items-center gap-2">
                                    <div className="cursor-pointer hover:duration-200 hover:scale-110 hover:bg-gray-200 p-3 rounded-xl">date</div>
                                    <div className="cursor-pointer scale-110 p-3 rounded-xl bg-primary-purple-500 text-white">date</div>
                                    <div className="cursor-pointer hover:duration-200 hover:scale-110 hover:bg-gray-200 p-3 rounded-xl">date</div>

                                </div>
                            </div>
                            <div className="flex flex-col items-start w-full gap-3 md:max-w-[50%] shadow-xl p-3 rounded-lg border">
                                <h3 className="text-xl font-semibold">Available Time</h3>
                                <div className="flex gap-3">
                                    {availableTime?.length > 0 && availableTime.map((item) => (
                                        <div key={item.value} className="p-2 rounded-2xl text-center text-gray-500 border-2 hover:bg-gray-200 cursor-pointer hover:scale-110 md:hover:duration-200">{item.label}</div>
                                    ))}
                                    <div className="p-2 rounded-2xl text-center text-white border-2 border-primary-purple-500 bg-primary-purple-500  cursor-pointer scale-110 ">09:00 pm</div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 w-full mb-6">
                            <h3 className='text-xl font-semibold'>Select Package</h3>
                            <div className="flex flex-col md:flex-row justify-center gap-2 w-full">
                                <div className="flex md:flex-col justify-between items-center gap-2 md:w-[1/3] md:min-w-[200px] lg:min-w-[300px] text-center rounded-xl p-3 hover:bg-gray-200 cursor-pointer md:hover:scale-105 md:hover:duration-200 shadow-xl border  ">
                                    {/* <div className="rounded-l-xl w-[5px] h-[100%] bg-red-200"></div> */}
                                    <div className="flex md:flex-col gap-3 items-center">
                                        <div className="flex justify-center items-center p-3 bg-primary-purple-200 rounded-full">
                                            <MdOutlineVideocam className='text-white' size={25} />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-col gap-2">
                                                <h4 className='font-bold'>Video Conversation</h4>
                                                <p className='text-gray-500'>$13.33 Per 30 minutes</p>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="radio" className="md:hidden" name='package' />
                                </div>
                                <div className="flex md:flex-col justify-between items-center gap-2 md:w-[1/3] md:min-w-[200px] lg:min-w-[300px] text-center rounded-xl p-3 hover:bg-gray-200 cursor-pointer md:hover:scale-105 md:hover:duration-200 shadow-xl border  ">
                                    {/* <div className="rounded-l-xl w-[5px] h-[100%] bg-red-200"></div> */}
                                    <div className="flex md:flex-col gap-3 items-center">
                                        <div className="flex justify-center items-center p-3 bg-primary-green-400 rounded-full">
                                            <FaPhone className='text-white' size={25} />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-col gap-2">
                                                <h4 className='font-bold'>Audio Conversation</h4>
                                                <p className='text-gray-500'>$13.33 Per 30 minutes</p>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="radio" className="md:hidden" name='package' />
                                </div>
                                <div className="flex md:flex-col justify-between items-center gap-2 md:w-[1/3] md:min-w-[200px] lg:min-w-[300px] text-center rounded-xl p-3 hover:bg-gray-200 cursor-pointer md:hover:scale-105 md:hover:duration-200 shadow-xl border  ">
                                    {/* <div className="rounded-l-xl w-[5px] h-[100%] bg-red-200"></div> */}
                                    <div className="flex md:flex-col gap-3 items-center">
                                        <div className="flex justify-center items-center p-3 bg-orange-700 rounded-full">
                                            <HiOutlineChat className='text-white' size={25} />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex flex-col gap-2">
                                                <h4 className='font-bold'>Live Conversation</h4>
                                                <p className='text-gray-500'>$13.33 Per 30 minutes</p>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="radio" className="md:hidden" name='package' />
                                </div>
                            </div>
                        </div>
                        <button
                            className="fixed bottom-3 mx-3 left-0 right-0 max-w-full sm:max-w-[30%] md:max-w-[20%] sm:mx-auto bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 text-white px-4 py-2 rounded-2xl"
                            onClick={() => alert('Button clicked')}
                        >
                            Set Appointment
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookDoctor
