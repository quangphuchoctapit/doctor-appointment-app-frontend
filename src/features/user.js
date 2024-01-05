import { createSlice } from "@reduxjs/toolkit";

const initStateValue = {
    username: '',
    image: '',
    location: '',
    email: '',
}

const userSlice = createSlice({
    name: 'user',
    initialState: { value: initStateValue },
    reducers: {
        editImage: (state, action) => {
            state.value = { ...state.value, image: action.payload }
        },
        updateEmail: (state, action) => {
            state.value = { ...state.value, email: action.payload }
        },
        updateEmail: (state, action) => {
            state.value = { ...state.value, email: action.payload }
        },
        editUsername: (state, action) => {
            state.value = { ...state.value, username: action.payload }
        },
        logout: (state) => {
            state.value = initStateValue
        }
    }
})

export const { editImage, updateEmail, logout, editUsername } = userSlice.actions

export default userSlice.reducer