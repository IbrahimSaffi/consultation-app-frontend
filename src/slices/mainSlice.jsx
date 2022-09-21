import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let baseURL = ""
export const createUser = createAsyncThunk(
    "auth / signup",
    async (data) => {
        console.log(data)
        let res = await fetch(baseURL+ "auth/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (res.status !== 200) {
            let e = await res.json()
            throw new Error(e.error)
        }
        else {
            return res.json()
        }

    }
)
let mainSlice = createSlice({
    name: "apiSlice",
    initialState: {
        accessToken: localStorage.getItem("ACCESS_TOKEN"),
        profile: JSON.parse(localStorage.getItem("PROFILE")),
        refreshToken: localStorage.getItem("REFRESH_TOKEN"),
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""

        })
    }
})
export const { } = mainSlice.actions
export default mainSlice.reducer