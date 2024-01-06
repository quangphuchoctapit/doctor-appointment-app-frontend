import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import Nav from '../Nav'
import { FaLocationDot } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { useSelector } from 'react-redux';
import SearchOverall from '../HTMLElements/SearchOverall';
import { FaTooth } from "react-icons/fa";
import { GiHeartBeats } from "react-icons/gi";
import { RiPsychotherapyFill, RiMenuFoldFill } from "react-icons/ri";

import { getAllClinics, getAllDoctors, getAllSpecialties } from '../../service/userService'
import { SEARCHOVERALL } from '../../utils/constants';

const HomePage = () => {
    const [listOverallSearch, setListOverallSearch] = useState([])

    const [specialtyData, setSpecialtyData] = useState([])
    useEffect(() => {
        fetchOverallSearch()
    }, [])

    const fetchOverallSearch = async () => {
        let resClinics = await getAllClinics()
        let resSpecialties = await getAllSpecialties()
        let resDoctors = await getAllDoctors()
        if (resClinics?.data?.EC === 0 && resSpecialties?.data?.EC === 0 && resDoctors?.data?.EC === 0) {

            let newDoctorData = resDoctors.data.DT.map((item) => {
                return { name: item.username }
            })
            let newClinicData = resClinics.data.DT.map((item) => {
                return { name: item.name }
            })
            let newSpecialtyData = resSpecialties.data.DT.map((item) => {
                setSpecialtyData(resSpecialties.data.DT)
                return { name: item.specialtyName }
            })
            let overallDataFromServer = [...newDoctorData, ...newClinicData, ...newSpecialtyData]
            setListOverallSearch(overallDataFromServer)
        }
    }


    const user = useSelector(state => state.user.value)
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
                    <SearchOverall data={listOverallSearch} category={SEARCHOVERALL} />
                    <div className="my-6">
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
                    <div className="my-6">
                        <div className="w-full shadow-xl border rounded-md p-3 bg-sky-50">
                            <div className="flex flex-col p-3 gap-3 justify-center">
                                <h3 className='text-2xl font-bold'>Doctor Specialty</h3>
                                <p>Doctommy consists of many specialties lol.</p>
                                <div className="flex sm:hidden gap-4 items-center justify-evenly mt-6">
                                    <div className="p-3 flex justify-center items-center rounded-full bg-blue-200 text-blue-600"><FaTooth size={25} /></div>
                                    <div className="p-3 flex justify-center items-center rounded-full bg-blue-200 text-blue-600"><RiPsychotherapyFill size={25} /></div>
                                    <div className="p-3 flex justify-center items-center rounded-full bg-blue-200 text-blue-600"><GiHeartBeats size={25} /></div>
                                    <div className="p-3 flex justify-center items-center rounded-full bg-blue-200 text-blue-600"><RiMenuFoldFill size={25} /></div>
                                </div>
                                <div className="hidden sm:flex gap-5 items-center justify-evenly mt-6 w-full overflow-x-scroll">
                                    {specialtyData?.length > 0 && specialtyData.map((item, index) => (
                                        <div key={index} className="p-3 flex flex-col gap-3 bg-primary-green-400 hover:scale-105 hover:duration-200 hover:bg-green-50 cursor-pointer shadow-xl border rounded-lg min-w-[200px] min-h-[200px]">
                                            <div className="text-lg font-bold">{item.specialtyName}</div>
                                            <div className="">{item.description}</div>
                                            <div className="">--22121 doctors---</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
