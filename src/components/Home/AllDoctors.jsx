import React, { useState, useEffect } from 'react'
import Nav from '../Nav'
import { getAllSpecialties, getAllDoctors } from '../../service/userService'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import Search from '../HTMLElements/Search';
import { DETAILDOCTOR } from '../../utils/constants';

const AllDoctors = () => {



    const [listSpecialties, setListSpecialties] = useState([])
    const [listDoctors, setListDoctors] = useState([])
    const [listDoctorName, setListDoctorName] = useState([])

    useEffect(() => {
        fetchAllSpecialties()
    }, [])
    useEffect(() => {
        fetchAllDoctors()
    }, [])
    const fetchAllSpecialties = async () => {
        let response = await getAllSpecialties()
        if (response?.data?.EC === 0) {
            setListSpecialties(response.data.DT)
        }
    }
    const fetchAllDoctors = async () => {
        let response = await getAllDoctors()
        if (response?.data?.EC === 0) {
            setListDoctors(response.data.DT)
        }
    }

    useEffect(() => {
        const listDoctorName = listDoctors.map((item) => (
            { name: item.username, id: item.id }
        ))
        setListDoctorName(listDoctorName)
    }, [listDoctors])




    return (
        <>
            <div className="all-doctors-container">
                <Nav />
                <div className="max-w-screen-lg mx-auto p-3 ">
                    <div className="flex justify-between flex-col">
                        <div className="my-3 flex flex-col items-center justify-center mx-auto w-full sm:w-[60%] md:min-w-[500px]">
                            <h1 className='text-2xl font-bold text-center'>Doctors in Doctommy</h1>
                            <Search category={listDoctorName} topic={DETAILDOCTOR} />
                            <div className="w-full overflow-x-auto flex gap-3 items-center">
                                <div className='p-3 rounded-md 
                                        border-2 hover:duration-200 hover:bg-gray-100 cursor-pointer'>All</div>
                                {listSpecialties?.length > 0 &&
                                    listSpecialties.map((item) => (
                                        <div key={item.id} className='p-3 rounded-md 
                                        border-2 hover:duration-200 hover:bg-gray-100 cursor-pointer'>{item.specialtyName}</div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="my-6 flex flex-col mx-0 lg:mx-0 md:mx-4">
                            <div className="flex flex-row items-center gap-5">
                                <h2 className='text-lg font-bold'>100 founds</h2>
                                <p className='text-gray-400'>Default</p>
                            </div>
                            <div className="mt-6 flex flex-col gap-3">
                                {listDoctors?.length > 0 ?
                                    listDoctors.map((item) => (
                                        <Link to={`/detail-doctor/${item.id}`} key={item.id} className="p-3 cursor-pointer  shadow-xl border hover:duration-200 hover:bg-gray-100 rounded-lg flex gap-8 md:gap-0 md:justify-between items-center">
                                            <div className="flex items-center gap-3">
                                                <div style={{ backgroundImage: `url('${item.image}')` }} className="border bg-center bg-cover bg-no-repeat rounded-full shadow-md shadow-primary-purple-200 w-[60px] sm:h-[80px] h-[60px] sm:w-[80px] md:w-[120px] md:h-[120px]"></div>
                                                <div className="flex flex-col gap-3 items-center">
                                                    <div className=" font-semibold">{item.username}</div>
                                                    <div className="text-gray-700">{item?.doctorData?.positionData?.positionName || 'Unset'}</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="">{item?.doctorData?.specialtyData?.specialtyName || 'Unset'}</div>
                                                <div className="hidden sm:block">{item?.doctorData?.clinicData?.name || 'Unset'}</div>
                                                <div className="hidden sm:block">{item?.doctorData?.locationData?.locationName || 'Unset'}</div>
                                            </div>
                                            <div className="hidden md:flex flex-col gap-1 md:flex-row items-center">
                                                <p>4.5</p>
                                                <div className=""><FaStar className='text-yellow-600' /></div>
                                            </div>
                                        </Link>
                                    ))
                                    :
                                    <div className="">Unable to find doctor. Please try again later</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllDoctors
