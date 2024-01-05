import React, { useState, useEffect, useCallback } from 'react'
import Nav from '../Nav'
import { getAllClinics, createClinic, updateClinic, getAllLocations } from '../../service/userService.js'
import { useHistory } from 'react-router-dom'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';


const ManageClinics = () => {
    let history = useHistory()
    const [openModal, setOpenModal] = React.useState(false);
    const [isAdd, setIsAdd] = useState(false)
    const [listClinics, setListClinics] = useState([])
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [currentClinicId, setCurrentClinicId] = useState('')
    const [selectedLocation, setSelectedLocation] = useState('')
    const [listLocations, setListLocations] = useState([])
    const [locationOptions, setLocationOptions] = useState([])



    const fetchAllClinics = useCallback(async () => {
        let dataServer = await getAllClinics()
        if (dataServer && dataServer.data.EC === 0) {
            setListClinics(dataServer.data.DT)
        } else {
            setListClinics([])
        }
    }, [])


    useEffect(() => {
        fetchAllClinics()
    }, [])

    useEffect(() => {
        let fetchAllLocations = async () => {
            let dataAllLocations = await getAllLocations()
            if (dataAllLocations && dataAllLocations.data.EC === 0) {

                if (dataAllLocations.data.DT.length > 0) {
                    let transformedObjListLocations = dataAllLocations.data.DT.map((item) => ({
                        value: item.locationId,
                        label: item.locationName
                    }))
                    setLocationOptions(transformedObjListLocations)
                }
            } else {
                setListLocations([])
            }
        }
        fetchAllLocations()
    }, [isAdd])




    const handleAddClinic = async () => {
        setIsAdd(true)
        setOpenModal(true)
        let data = await createClinic({
            name,
            location: selectedLocation,
            description,
            image
        })
        if (data && data.data.EC === 0) {
            toast.success(data.data.EM)
            setImage('')
            setLocation('')
            setName('')
            setDescription('')
            setOpenModal(false)
            fetchAllClinics()
        }
    }


    const handleUpdateClinic = async (clinicId) => {
        setIsAdd(false)
        setOpenModal(true)

        setCurrentClinicId(clinicId)
        let data = await updateClinic({
            name,
            location: selectedLocation,
            description,
            image,
            id: clinicId
        })

        if (data && data.data.EC === 0) {
            toast.success(data.data.EM)
            setImage('')
            setLocation('')
            setName('')
            setDescription('')
            setOpenModal(false)
            fetchAllClinics()
        }

    }

    // const deleteClinic = (data) => {
    //     console.log('delete: ', data.id)
    // }



    return (
        <>
            <Nav />
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <h2 className='text-center font-semibold text-xl'>{isAdd ? 'Add New Clinic' : `Modify clinic's detail`}</h2>
                <div className="grid grid-cols-2 gap-3 items-center">
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} className='my-2 p-3 border-2 rounded-lg' id="name" />
                    </div>
                    <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
                        <label htmlFor="location">Location</label>
                        <Select options={locationOptions} value={locationOptions.value} onChange={(locationOptions) => setSelectedLocation(locationOptions.value)} />

                    </div>
                    <div className="col-span-2 flex flex-col gap-2">
                        <label htmlFor="description">Description</label>
                        <textarea value={description} onChange={e => setDescription(e.target.value)} className='my-2 p-3 border-2 rounded-lg' id="description" rows='3' ></textarea>
                    </div>
                    <div className="col-span-2 flex flex-col gap-2">
                        <label htmlFor="image">Image</label>
                        <input value={image} onChange={e => setImage(e.target.value)} className='my-2 p-3 border-2 rounded-lg' id="image" />
                    </div>
                    <div className='col-span-2 text-end mt-3'>
                        <button onClick={isAdd ? handleAddClinic : () => handleUpdateClinic(currentClinicId)} className='p-3 bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 text-white rounded-md'>{isAdd ? 'Add' : `Save`}</button>
                    </div>
                </div>
            </Modal>

            <div className='w-full my-6'>
                <div className="max-w-screen-lg mx-auto">
                    <div className="p-3 flex flex-col gap-5">
                        <input type="text" className='p-3 w-full rounded-xl my-3 bg-gray-100 text-black' placeholder='Search...' />
                        <div className="flex justify-center md:justify-end items-center gap-2">
                            <div onClick={handleAddClinic} className="p-3 rounded-md border-2 bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 cursor-pointer text-white">Add Clinics</div>
                        </div>
                        <div className="flex flex-col gap-3 mt-6">
                            {listClinics && listClinics.length > 0 ? listClinics.map((clinic, index) => (
                                <div key={clinic.id} onClick={() => handleUpdateClinic(clinic.id)} className="p-3 border-2 rounded-lg flex justify-between items-center">
                                    <div className="h-[50px] hidden sm:block w-[50px] border border-red-400"></div>
                                    <div className="flex flex-col items-center flex-grow">
                                        <h3>Name</h3>
                                        <p>{clinic.name}</p>
                                    </div>
                                    <div className="flex flex-col items-center flex-grow">
                                        <h3>Location</h3>
                                        <p>{clinic.clinicLocationData && clinic.clinicLocationData.locationName}</p>
                                    </div>
                                    <div className="sm:flex hidden flex-col items-center flex-grow">
                                        <h3>Active doctors</h3>
                                        <p>--2210821--</p>
                                    </div>
                                </div>
                            )) :
                                <div className='d-flex flex-row justify-content-center gap-4'>
                                    <div className='text-center fs-3'>No result.</div>
                                    <button onClick={handleAddClinic} className='p-3 rounded-md border-2 bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 cursor-pointer text-white'>Add New Specialty</button>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManageClinics
