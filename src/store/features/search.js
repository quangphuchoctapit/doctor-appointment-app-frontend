
import { createSlice, current } from "@reduxjs/toolkit";

const initStateValue = {
    query: '',
    listItems: {
        doctors: []
    },
    results: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState: { value: initStateValue },
    reducers: {
        setSearchQuery: (state, action) => {
            state.value.query = action.payload
        },
        setListDoctorRedux: (state, action) => {
            state.value.listItems = { doctors: action.payload }
        },
        setSearchResults: (state) => {
            const searchQuery = state.value.query.toLowerCase();
            state.value.results = state.value.listItems.doctors.filter((item) => {
                return item.name.toLowerCase().includes(searchQuery)
            }
            );
        },
    }
})

export const { setSearchQuery, setListDoctorRedux, setSearchResults } = searchSlice.actions

export default searchSlice.reducer