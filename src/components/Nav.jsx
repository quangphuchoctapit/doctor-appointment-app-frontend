import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/features/user'
import { getAllClinics, getAllDoctors, getAllSpecialties } from '../service/userService'
import { SEARCHOVERALL } from '../utils/constants';
import SearchOverall from './HTMLElements/SearchOverall';
const Nav = () => {
    const [listOverallSearch, setListOverallSearch] = useState([])
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
                return { name: item.specialtyName }
            })
            let overallDataFromServer = [...newDoctorData, ...newClinicData, ...newSpecialtyData]
            setListOverallSearch(overallDataFromServer)
            console.log('listOverallSearch', listOverallSearch)

        }
    }

    useEffect(() => {
        // fetchOverallSearch()
    }, [listOverallSearch])


    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    const [openMangeAdmin, setOpenManageAdmin] = useState(false)
    return (
        <div className="w-full max-h-[100px] bg-black sticky top-0 left-0 hidden sm:block z-[100]">
            <div className="max-w-screen-lg mx-auto">
                <div className="flex justify-between items-center gap-5  pr-3 ">
                    <div className="flex justify-start items-center text-white">
                        <Link to='/' className="p-5 hover:bg-slate-600 hover:duration-200">Home</Link>
                        <div onClick={() => setOpenManageAdmin(!openMangeAdmin)} className={openMangeAdmin ? "p-5 cursor-pointer bg-slate-600 hover:duration-200 relative" : "p-5 cursor-pointer hover:bg-slate-600 hover:duration-200 relative"}>
                            Admin
                            {openMangeAdmin &&
                                <div className="absolute mt-6 flex flex-col rounded-md min-w-[200px] bg-black text-white items-center justify-center">
                                    <Link to='/manage-list-users' className="rounded-t-lg hover:bg-slate-600 hover:duration-200 p-3 w-full flex justify-center items-center">Manage Users</Link>
                                    <Link to='/manage-list-doctors' className=" hover:bg-slate-600 hover:duration-200 p-3 w-full flex justify-center items-center">Manage Doctors</Link>
                                    <Link to='/manage-list-specialties' className=" hover:bg-slate-600 hover:duration-200 p-3 w-full flex justify-center items-center">Manage Specialties</Link>
                                    <Link to='/manage-list-clinics' className="rounded-b-lg hover:bg-slate-600 hover:duration-200 p-3 w-full flex justify-center items-center">Manage Clinics</Link>
                                    {/* <Link to='/' className="p-5 hover:bg-slate-600 hover:duration-200">Home</Link> */}

                                </div>
                            }
                        </div>
                        <Link to='/all-doctors' className="p-5 hidden md:block hover:bg-slate-600 hover:duration-200">All Doctors</Link>

                    </div>
                    <div className='flex gap-2 min-w-[300px] md:min-w-[400px]'>
                        <SearchOverall data={listOverallSearch} category={SEARCHOVERALL} />
                    </div>
                    <div className=" text-white flex gap-2 items-center">
                        <Link to='/user-profile/'>
                            <div style={{ backgroundImage: `url('${user.image}')` }} className="w-12 h-12 rounded-full border-2 border-green-400 bg-cover bg-center bg-no-repeat"></div>
                        </Link>
                        <Link onClick={() => dispatch(logout())} to='/login'>
                            <button className='p-2 border rounded-lg flex items-center text-red-400 hover:text-white hover:bg-red-500 hover:duration-200 border-red-400'>Log out</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav
