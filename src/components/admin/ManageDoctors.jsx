import React, { useState, useEffect, useCallback } from 'react'

import Nav from '../Nav'
import {
    getAllDoctors, getAllClinics, getAllSpecialties,
    getAllDoctorPositions, getAllLocations, createDoctorInfo,
    getAllSchedule
} from '../../service/userService'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import Select from 'react-select'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../HTMLElements/Search'
import { SEARCHDOCTORS } from '../../utils/constants';



const ManageDoctors = () => {
    let history = useHistory()
    const [listDoctorName, setListDoctorName] = useState([])
    const [listUsers, setListUsers] = useState([])
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedClinic, setSelectedClinic] = useState('')
    const [description, setDescription] = useState('')
    const [selectedPosition, setSelectedPosition] = useState('')
    const [selectedSpecialty, setSelectedSpecialty] = useState('')
    const [selectedSchedule, setSelectedSchedule] = useState('')

    const [selectedLocation, setSelectedLocation] = useState('')
    const [listClinics, setListClinics] = useState([])
    const [listSpecialties, setListSpecialties] = useState([])
    const [listPositions, setListPositions] = useState([])

    const [listSchedule, setListSchedule] = useState([])
    const [listLocations, setListLocations] = useState([])
    const [currentSelectedDoctorInfo, setCurrentSelectedDoctorInfo] = useState('')
    const [clinicOptions, setClinicOptions] = useState([])
    const [locationOptions, setLocationOptions] = useState([])
    const [positionOptions, setPositionOptions] = useState([])
    const [specialtyOptions, setSpecialtyOptions] = useState([])
    const [scheduleOptions, setScheduleOptions] = useState([])

    useEffect(() => {
        const fetchAllClinics = async () => {
            let dataAllClinics = await getAllClinics()
            if (dataAllClinics && dataAllClinics.data.EC === 0) {
                setListClinics(dataAllClinics.data.DT)
                if (listClinics && listClinics.length > 0) {
                    let transformedObjListClinics = listClinics.map((item) => ({
                        value: item.id,
                        label: item.name
                    }))
                    setClinicOptions(transformedObjListClinics)
                }
            } else {
                setListClinics([])
            }
        }
        let fetchAllSpecialties = async () => {
            let dataAllSpecialties = await getAllSpecialties()
            if (dataAllSpecialties && dataAllSpecialties.data.EC === 0) {
                setListSpecialties(dataAllSpecialties.data.DT)
                if (listSpecialties && listSpecialties.length > 0) {
                    let transformedObjListClinics = listSpecialties.map((item) => ({
                        value: item.specialtyId,
                        label: item.specialtyName
                    }))
                    setSpecialtyOptions(transformedObjListClinics)
                }
            } else {
                setListSpecialties([])
            }
        }
        let fetchAllPositions = async () => {
            let dataAllPositions = await getAllDoctorPositions()
            if (dataAllPositions && dataAllPositions.data.EC === 0) {
                setListPositions(dataAllPositions.data.DT)
                if (listPositions && listPositions.length > 0) {
                    let transformedObjListClinics = listPositions.map((item) => ({
                        value: item.positionId,
                        label: item.positionName
                    }))
                    setPositionOptions(transformedObjListClinics)
                }
            } else {
                setListPositions([])
            }
        }
        let fetchAllSchedule = async () => {
            let dataAllSchedule = await getAllSchedule()
            if (dataAllSchedule && dataAllSchedule.data.EC === 0) {
                setListSchedule(dataAllSchedule.data.DT)
                if (listSchedule && listSchedule.length > 0) {
                    let transformedObjSchedule = listSchedule.map((item) => ({
                        value: item.scheduleId,
                        label: item.scheduleName
                    }))
                    setScheduleOptions(transformedObjSchedule)
                }
            } else {
                setListSchedule([])
            }
        }
        let fetchAllLocations = async () => {
            let dataAllLocations = await getAllLocations()
            if (dataAllLocations && dataAllLocations.data.EC === 0) {
                setListLocations(dataAllLocations.data.DT)
                if (listLocations && listLocations.length > 0) {
                    let transformedObjListLocations = listLocations.map((item) => ({
                        value: item.id,
                        label: item.locationName
                    }))
                    setLocationOptions(transformedObjListLocations)
                }
            } else {
                setListSpecialties([])
            }
        }
        fetchAllPositions()
        fetchAllSpecialties()
        fetchAllClinics()
        fetchAllLocations()
        fetchAllSchedule()
    }, [openModal])

    useEffect(() => {
        const listDoctorName = listUsers.map((item) => (
            { name: item.username, id: item.id }
        ))
        setListDoctorName(listDoctorName)
    }, [listUsers])


    useEffect(() => {
        const fetchAllUsers = async () => {
            let dataServer = await getAllDoctors()
            if (dataServer && dataServer.data.EC === 0) {
                setListUsers(dataServer.data.DT)
            } else {
                setListUsers([])
            }
        }
        fetchAllUsers()
    }, [])

    const goToManageUsers = () => {
        history.push('/manage-list-users')
    }

    const handleCreateDoctorInfo = async (userId) => {
        let data = await createDoctorInfo({
            doctorId: userId,
            specialtyId: selectedSpecialty,
            description: description,
            positionId: selectedPosition,
            clinicId: selectedClinic,
            locationId: selectedLocation,
            scheduleId: selectedSchedule
        })
        if (data && data.data.EC === 0) {
            toast.success(data.data.EM)
            let dataServer = await getAllDoctors()
            if (dataServer && dataServer.data.EC === 0) {
                setListUsers(dataServer.data.DT)
            }
            setOpenModal(false)
            setSelectedClinic('')
            setDescription('')
            setSelectedPosition('')
            setSelectedSpecialty('')
            setSelectedLocation('')
            setSelectedSchedule('')
        }
    }

    const handleModifyDoctorInfo = async (userId) => {
        setOpenModal(true)
        setCurrentSelectedDoctorInfo(userId)
        handleCreateDoctorInfo(userId)
    }

    return (
        <>
            <Nav />
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <h2>Modify doctor's detail</h2>
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="specialty">Specialty</label>
                        <Select options={specialtyOptions} value={specialtyOptions.value} onChange={(specialtyOptions) => setSelectedSpecialty(specialtyOptions.value)} />

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="clinic">Clinic</label>
                        <Select options={clinicOptions} value={clinicOptions.value} onChange={(clinicOptions) => setSelectedClinic(clinicOptions.value)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="position">Position</label>
                        <Select options={positionOptions} value={positionOptions.value} onChange={(positionOptions) => setSelectedPosition(positionOptions.value)} />

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="location">Location</label>
                        <Select options={locationOptions} value={locationOptions.value} onChange={(locationOptions) => setSelectedLocation(locationOptions.value)} />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label htmlFor="location">Schedule</label>
                        <Select options={scheduleOptions} value={scheduleOptions.value} onChange={(scheduleOptions) => setSelectedSchedule(scheduleOptions.value)} />
                    </div>
                    <div className="col-span-2 flex flex-col  gap-5">
                        <label htmlFor="description">Description</label>
                        <textarea className='border' rows={3} htmlFor="description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className='col-span-2 text-end mt-3'>
                        <button onClick={() => handleCreateDoctorInfo(currentSelectedDoctorInfo)} className='p-3 w-full md:max-w-[20%] rounded-md bg-primary-purple-500 hover:duration-200 text-white hover:bg-primary-purple-200'>Save</button>
                    </div>
                </div>
            </Modal>

            <div className='w-full my-6'>
                <div className="max-w-screen-lg mx-auto">
                    <div className="p-3 flex flex-col gap-5">
                        <Search category={SEARCHDOCTORS} data={listDoctorName} topic={SEARCHDOCTORS} />
                        <div className="flex justify-center md:justify-end items-center gap-2">
                            <div onClick={goToManageUsers} className="p-3 rounded-md border-2 bg-primary-purple-500 hover:duration-200 hover:bg-primary-purple-200 cursor-pointer text-white">Add Doctor</div>
                        </div>
                        <div className="flex flex-col gap-3 mt-6">
                            {listUsers && listUsers.length > 0 ? listUsers.map((user, index) => (
                                <div key={user.id} onClick={() => handleModifyDoctorInfo(user.id)} className="p-3 border-2 rounded-lg flex justify-between items-center">
                                    <div style={{ backgroundImage: `url('${user.image}')` }} className="h-[50px] mr-5 hidden sm:block w-[50px] border shadow-lg bg-cover bg-no-repeat bg-center rounded-full"></div>
                                    <div className="flex flex-col items-start justify-center flex-grow">
                                        <h3>Name</h3>
                                        <p>{user.username}</p>
                                    </div>
                                    <div className=" hidden sm:flex flex-col items-start justify-center flex-grow">
                                        <h3>Position</h3>
                                        <p>{user.doctorData ? (user.doctorData.positionData && user.doctorData.positionData.positionName) : 'Unset'}</p>
                                    </div>
                                    <div className=" flex-col flex items-start justify-center flex-grow">
                                        <h3>Specialty</h3>
                                        <p>{user.doctorData ? (user.doctorData.specialtyData && user.doctorData.specialtyData.specialtyName) : 'Unset'}</p>
                                    </div>
                                    <div className=" flex-col hidden md:flex items-start justify-center flex-grow">
                                        <h3>Clinic</h3>
                                        <p>{user.doctorData ? (user.doctorData.clinicData && user.doctorData.clinicData.name) : 'Unset'}</p>
                                    </div>
                                    <div className=" flex-col hidden md:flex items-start justify-center flex-grow">
                                        <h3>Location</h3>
                                        <p>{user.doctorData ? (user.doctorData.locationData && user.doctorData.locationData.locationName) : 'Unset'}</p>
                                    </div>
                                </div>
                            ))
                                :
                                <div className='flex flex-row justify-center gap-4'>
                                    <div className='text-center '>No result.</div>
                                    <button onClick={goToManageUsers} className='p-3 bg-yellow-300 hover:duration-200 hover:bg-yellow-200'>Set New Doctor</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default ManageDoctors
