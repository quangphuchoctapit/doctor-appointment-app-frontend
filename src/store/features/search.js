
import { createSlice, current } from "@reduxjs/toolkit";

const initStateValue = {
    query: '',
    queryOverall: '',
    listItems: {
        doctors: [],
        users: [],
        specialties: [],
        clinics: [],
    },
    overallSearch: [],
    results: [],
    resultOverall: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState: { value: initStateValue },
    reducers: {
        setSearchQuery: (state, action) => {
            state.value.query = action.payload
        },

        setSearchQueryOverall: (state, action) => {
            state.value.queryOverall = action.payload
        },

        // search doctors
        setListDoctorRedux: (state, action) => {
            state.value.listItems = { doctors: action.payload }
        },
        setSearchDoctorResult: (state) => {
            const searchQuery = state.value.query.toLowerCase();
            console.log('doctorlist redux', current(state.value.listItems))
            state.value.results = state.value.listItems.doctors.filter((item) => {
                return item.name.toLowerCase().includes(searchQuery)
            }
            );
        },

        // search every users
        setListUserRedux: (state, action) => {
            state.value.listItems = { users: action.payload }
        },
        setSearchUserResult: (state) => {
            const searchQuery = state.value.query.toLowerCase();
            console.log(current(state.value.listItems))
            state.value.results = state.value.listItems.users.filter((item) => {
                return item.name.toLowerCase().includes(searchQuery)
            }
            );
        },

        // search specialties
        setListSpecialtyRedux: (state, action) => {
            state.value.listItems = { specialties: action.payload }
        },
        setSearchSpecialtyResult: (state) => {
            const searchQuery = state.value.query.toLowerCase();
            state.value.results = state.value.listItems.specialties.filter((item) => {
                return item.name.toLowerCase().includes(searchQuery)
            }
            );
        },

        // search clinics
        setListClinicRedux: (state, action) => {
            state.value.listItems = { clinics: action.payload }
        },
        setSearchClinicResult: (state) => {
            const searchQuery = state.value.query.toLowerCase();
            state.value.results = state.value.listItems.clinics.filter((item) => {
                return item.name.toLowerCase().includes(searchQuery)
            }
            );
        },


        //  overall seaerch
        setListOverallRedux: (state, action) => {
            state.value.overallSearch = [action.payload]
        },
        setSearchOverallResult: (state) => {
            const searchQuery = state.value.queryOverall.toLowerCase();
            let searchList = state.value.overallSearch
            state.value.resultOverall = searchList[0].filter((item) => {
                return item.name.toLowerCase().includes(searchQuery)
            }
            );
        },
    }
})

export const { setSearchQuery, setListDoctorRedux,
    setSearchDoctorResult, setSearchUserResult,
    setListUserRedux, setListSpecialtyRedux,
    setSearchSpecialtyResult, setListClinicRedux,
    setSearchClinicResult, setListOverallRedux, setSearchQueryOverall, setSearchOverallResult } = searchSlice.actions

export default searchSlice.reducer