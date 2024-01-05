import axios from '../setup/axios'

const registerNewUser = async (username, email, password) => {
    return await axios.post('/api/v1/signup', {
        username, email, password
    })
}

const checkLogin = async (email, password) => {
    return await axios.post('/api/v1/login', {
        email, password
    })
}

const getAllDoctors = async () => {
    return await axios.get('/api/v1/get-all-doctors')
}

const getAllClinics = async () => {
    return await axios.get('/api/v1/get-all-clinics')
}


const getAllPositions = async () => {
    return await axios.get('/api/v1/get-all-positions')
}


const getAllSpecialties = async () => {
    return await axios.get('/api/v1/get-all-specialties')
}


const getAllUsers = async () => {
    return await axios.get('/api/v1/get-all-users')
}

const filterRoleNotEqualTo = async (data) => {
    return await axios.post('/api/v1//filter-role-not-equal-to', data)
}

const setUserRole = async (data) => {
    return await axios.put('/api/v1/set-user-role', data)
}

const getUserRole = async (data) => {
    return await axios.post('/api/v1/get-user-role', data)
}

const createClinic = async (data) => {
    return await axios.post('/api/v1/create-clinic', data)
}

const updateClinic = async (data) => {
    return await axios.put('/api/v1/update-clinic', data)
}

const createSpecialty = async (data) => {
    return await axios.post('/api/v1/create-specialty', data)
}

const updateSpecialty = async (data) => {
    return await axios.put('/api/v1/update-specialty', data)
}


const getAllDoctorPositions = async () => {
    return await axios.get('/api/v1/get-all-doctor-positions')
}

const getAllLocations = async () => {
    return await axios.get('/api/v1/get-all-locations')
}


const createDoctorInfo = async (data) => {
    return await axios.post('/api/v1/create-doctor-info', data)
}

const getDoctorInfo = async (data) => {
    return await axios.post('/api/v1/get-doctor-info', data)
}

const editUserImage = async (data) => {
    return await axios.put('/api/v1/user/edit-img', data)
}


export {
    checkLogin, registerNewUser, getAllDoctors,
    getAllPositions, getAllDoctorPositions, createDoctorInfo,
    getAllClinics, getAllUsers, filterRoleNotEqualTo,
    setUserRole, getUserRole, createClinic,
    updateClinic, createSpecialty, updateSpecialty,
    getAllSpecialties, getAllLocations, getDoctorInfo,
    editUserImage
}