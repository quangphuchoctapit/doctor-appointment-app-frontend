import React, { useState, useCallback, useEffect } from 'react'
import Nav from '../Nav'
import { getAllSpecialties, updateSpecialty, createSpecialty } from '../../service/userService'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


const ManageSpecialties = () => {
    const [openModal, setOpenModal] = React.useState(false);
    const [isAdd, setIsAdd] = useState(false)
    const [specialtyName, setSpecialtyName] = useState('')
    const [specialtyId, setSpecialtyId] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [currentSpecialtyId, setCurrentSpecialtyId] = useState('')

    const fetchAllSpecialties = useCallback(async () => {
        let dataServer = await getAllSpecialties()
        if (dataServer && dataServer.data.EC === 0) {
            setListSpecialties(dataServer.data.DT)
        } else {
            setListSpecialties([])
        }
    }, [])


    const [listSpecialties, setListSpecialties] = useState([])
    useEffect(() => {
        fetchAllSpecialties()
    }, [])


    const handleAddSpecialty = async () => {
        setIsAdd(true)
        setOpenModal(true)
        let data = await createSpecialty({
            specialtyName,
            specialtyId,
            description,
            image
        })
        if (data && data.data.EC === 0) {
            toast.success(data.data.EM)
            setImage('')
            setSpecialtyId('')
            setSpecialtyName('')
            setDescription('')
            setOpenModal(false)
            fetchAllSpecialties()
        }
    }


    const handleUpdateSpecialty = async (clinicId) => {
        setIsAdd(false)
        setOpenModal(true)

        setCurrentSpecialtyId(clinicId)
        let data = await updateSpecialty({
            specialtyName,
            specialtyId,
            description,
            image,
            id: clinicId
        })

        if (data && data.data.EC === 0) {

            toast.success(data.data.EM)
            setImage('')
            setSpecialtyId('')
            setSpecialtyName('')
            setDescription('')
            setOpenModal(false)
            fetchAllSpecialties()
        }

    }

    return (
        <>
            <Nav />
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <h2>{isAdd ? 'Add New Specialty' : `Modify specialty's detail`}</h2>
                {/* <div className='container'> */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                        <label htmlFor="specialtyName">Specialty's name</label>
                        <input value={specialtyName} onChange={e => setSpecialtyName(e.target.value)} className='border border-gray-500 p-3 rounded-lg' id="specialtyName" />
                    </div>
                    <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                        <label htmlFor="specialtyId">ID</label>
                        <input value={specialtyId} onChange={e => setSpecialtyId(e.target.value)} className='border border-gray-500 p-3 rounded-lg' id="specialtyId" />
                    </div>
                    <div className="flex flex-col col-span-2 gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className='border border-gray-500 p-3 rounded-lg' id="description" rows='3' ></textarea>
                    </div>
                    <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
                        <label htmlFor="image">Image</label>
                        <input value={image} onChange={e => setImage(e.target.value)} className='border border-gray-500 p-3 rounded-lg' id="image" />
                    </div>
                    <div className='col-span-2 text-end mt-3'>
                        <button onClick={isAdd ? handleAddSpecialty : () => handleUpdateSpecialty(currentSpecialtyId)} className='p-3 bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 text-white rounded-md'>{isAdd ? 'Add' : `Save`}</button>
                    </div>
                </div>
                {/* </div> */}
            </Modal>

            <div className='w-full my-6'>
                <div className="max-w-screen-lg mx-auto">
                    <div className="p-3 flex flex-col gap-5">
                        <input type="text" className='p-3 w-full rounded-xl my-3 bg-gray-100 text-black' placeholder='Search...' />
                        <div className="flex justify-center md:justify-end items-center gap-2">
                            <div onClick={handleAddSpecialty} className="p-3 rounded-md border-2 bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 cursor-pointer text-white">Add Specialty</div>
                        </div>
                        <div className="flex flex-col gap-3 mt-6">
                            {listSpecialties && listSpecialties.length > 0 ? listSpecialties.map((specialty, index) => (
                                <div onClick={() => handleUpdateSpecialty(specialty.id)} key={specialty.id} className="p-3 border-2 cursor-pointer hover:duration-300 hover:bg-gray-100 rounded-lg flex justify-between items-center">
                                    <div className="h-[50px] hidden sm:block w-[50px] border border-red-400"></div>
                                    <div className="flex flex-col items-center flex-grow">
                                        <h3>Name</h3>
                                        <p>{specialty.specialtyName}</p>
                                    </div>
                                    <div className="flex flex-col items-center flex-grow">
                                        <h3>Specialty's ID</h3>
                                        <p>{specialty.specialtyId}</p>
                                    </div>
                                    <div className="md:flex hidden flex-col items-center flex-grow">
                                        <h3>Description</h3>
                                        <p>{specialty.description}</p>
                                    </div>
                                    <div className="sm:flex hidden flex-col items-center flex-grow">
                                        <h3>Active doctors</h3>
                                        <p>--2210821--</p>
                                    </div>
                                </div>
                            ))
                                :

                                <div className='d-flex flex-row justify-content-center gap-4'>
                                    <div className='text-center fs-3'>No result.</div>
                                    <button onClick={handleAddSpecialty} className='p-3 rounded-md border-2 bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 cursor-pointer text-white'>Add New Specialty</button>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManageSpecialties
