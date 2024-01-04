import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';


const Nav = () => {
    const [openMangeAdmin, setOpenManageAdmin] = useState(false)
    return (
        <div className="w-full max-h-[100px] bg-black sticky top-0 left-0 hidden sm:block">
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
                    <div className='flex gap-2'>
                        <input type="text" placeholder='Search...' className='border-2 bg-transparent text-white border-white p-2 rounded-lg' />
                        <button className='p-2 border rounded-lg text-primary-green-600 hover:text-white hover:bg-primary-green-600 hover:duration-200 border-primary-green-600'>Search</button>
                    </div>
                    <div className=" text-white">
                        <Link to='/login'>
                            <button className='p-2 border rounded-lg flex items-center text-red-400 hover:text-white hover:bg-red-500 hover:duration-200 border-red-400'>Log out</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nav
