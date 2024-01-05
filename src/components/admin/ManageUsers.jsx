import React, { useState, useCallback, useEffect } from 'react'
import Nav from '../Nav'
import { getAllUsers, setUserRole, getUserRole, filterRoleNotEqualTo } from '../../service/userService'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


const ManageUsers = () => {
    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const [listUserFilter, setListUserFilter] = useState([])
    const [selectedRole, setSelectedRole] = useState('')
    const [selectedRoleId, setSelectedRoleId] = useState('')
    const [listUsers, setListUsers] = useState([])

    const openModal = async (roleFilter) => {
        setSelectedRoleId(roleFilter)
        handleUpdateRoleFilter(roleFilter)
    }

    const closeModal = () => {
        setIsOpenModal(false)
    }

    const fetchAllUsers = useCallback(async () => {
        let dataServer = await getAllUsers()
        if (dataServer && dataServer.data.EC === 0) {
            setListUsers(dataServer.data.DT)
        } else {
            setListUsers([])
        }
    }, [])

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const handleUpdateRoleFilter = async (roleFilter) => {
        let response = await filterRoleNotEqualTo({
            roleId: roleFilter
        })
        if (response && response.data && response.data.EC === 0) {
            setListUserFilter(response.data.DT)
            setIsOpenModal(true);
            let getRole = await getUserRole({ roleId: roleFilter })
            setSelectedRole(getRole.data.DT.roleName)
        } else {
            toast.error('Error from server')
            setIsOpen(true);
            setSelectedRole('-')
            setSelectedRoleId('-')
        }
    }

    const setRole = async (id, selectedRole) => {
        let result = await setUserRole({
            id: id, selectedRole: selectedRole
        })
        if (result && result.data && result.data.EC === 0) {
            fetchAllUsers()
            toast.success(result.data.EM)
            handleUpdateRoleFilter(selectedRoleId)
        } else {
            toast.error('Error from server... Cannot set role for this user')
        }
    }

    return (
        <>
            <Nav />

            <Modal style={{ width: '80vw !important' }} open={isOpenModal} onClose={closeModal}>
                <h2>Set User Role</h2>
                {listUserFilter && listUserFilter.length > 0 ? listUserFilter.map((user) => (
                    <div key={user.id} className="p-3 rounded-md border flex flex-col gap-2">
                        <div className="flex justify-between">
                            <div className="w-full flex gap-2 items-center">
                                <div className="w-[50px] h-[50px] border hidden md:block border-red-300"></div>
                                <div className="font-semibold">{user.username}</div>
                            </div>
                            <div className="">
                                <button onClick={e => setRole(user.id, selectedRoleId)} className='p-3 rounded-md bg-primary-purple-500 hover:duration-200 text-white hover:bg-primary-purple-200'>{`Set ${selectedRole}`}</button>
                            </div>
                        </div>
                    </div>
                )) : <div>All of the users have this role.</div>}
            </Modal>



            <div className='w-full my-6'>
                <div className="max-w-screen-lg mx-auto">
                    <div className="p-3 flex flex-col gap-5">
                        <input type="text" className='p-3 w-full rounded-xl my-3 bg-gray-100 text-black' placeholder='Search...' />
                        <div className="flex justify-center md:justify-end items-center gap-2">
                            <div onClick={() => openModal('D')} className="p-3 rounded-md border-2 bg-gray-600 hover:duration-200 hover:bg-gray-500 cursor-pointer text-white">Set Doctor</div>
                            <div onClick={() => openModal('A')} className="p-3 rounded-md border-2 bg-gray-600 hover:duration-200 hover:bg-gray-500 cursor-pointer text-white">Set Admin</div>
                            <div onClick={() => openModal('P')} className="p-3 rounded-md border-2 bg-gray-600 hover:duration-200 hover:bg-gray-500 cursor-pointer text-white">Set User</div>
                        </div>
                        <div className="flex flex-col gap-3 mt-6">
                            {listUsers && listUsers.length > 0 && listUsers.map((user, index) => (
                                <div key={user.id} className="p-3 border-2 rounded-lg flex justify-between items-center">
                                    <div className="h-[50px] hidden sm:block w-[50px] border border-red-400"></div>
                                    <div className="flex flex-col items-center flex-grow">
                                        <h3>Name</h3>
                                        <p>{user.username}</p>
                                    </div>
                                    <div className=" hidden md:flex flex-col items-center flex-grow">
                                        <h3>Email</h3>
                                        <p>{user.email}</p>
                                    </div>
                                    <div className="flex flex-col items-center flex-grow">
                                        <h3>Role</h3>
                                        <p>{user.roleData ? user.roleData.roleName : 'Patient'}</p>
                                    </div>
                                    {/* <div className=" flex-col hidden md:flex items-center flex-grow">
                                        <h3>Address</h3>
                                        <p>Dog Villa</p>
                                    </div> */}
                                </div>
                            ))

                            }

                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManageUsers
