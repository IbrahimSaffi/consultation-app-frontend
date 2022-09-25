import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let baseURL = "http://localhost:8000/"
export const createUser = createAsyncThunk(
    "auth / signup",
    async (data) => {
        console.log(data)
        let res = await fetch(baseURL + "auth/signup", {
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
export const login = createAsyncThunk(
    "auth / login",
    async (data) => {
        console.log(data)
        let res = await fetch(baseURL + "auth/login", {
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
export const token = createAsyncThunk(
    "auth / token",
    async (data) => {
        console.log(data)
        let res = await fetch(baseURL + "auth/token", {
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
export const updateInformationDoctor = createAsyncThunk(
    " update / doctor",
    async (data, { getState }) => {
        console.log(data)
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "doctor/update/" + data.id, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.dataValues),
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
export const getDoctors = createAsyncThunk(
    "get / doctors",
    async (data, { getState }) => {
        console.log(data)
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "doctor", {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
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
export const getSpecificPatient = createAsyncThunk(
    " get / patient",
    async (data, { getState }) => {
        console.log(data)
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "patient/" + data.id, {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
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
export const updatePatient = createAsyncThunk(
    " update / patient",
    async (data, { getState }) => {
        console.log(data)
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "patient/update/" + data.id, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data.dataValues),
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
export const rateDoctor = createAsyncThunk(
    " rate / doctor",
    async (data, { getState }) => {
        console.log(data)
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "consultation/review/" + data.id, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
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
export const bookDoctor = createAsyncThunk(
    " book / doctor",
    async (data, { getState }) => {
        console.log(data)
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "consultation/book/", {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
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
export const prescribePatient = createAsyncThunk(
    " prescribe / patient",
    async (data, { getState }) => {
        console.log(data)
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "consultation/prescribe/" + data.id, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
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
export const getAllBookingsDoctor = createAsyncThunk(
    " get / doctor /consultations",
    async (id, { getState }) => {
        console.log(id)
        //Doctor id
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "consultation/doctor/" + id, {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
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
export const getAllBookingsPatient = createAsyncThunk(
    " get / patient/ consultations",
    async (data, { getState }) => {
        console.log(data)
        //Patient id
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "consultation/patient/" + data.id, {
            method: "POST",
            headers: {
                Authorization: 'Bearer ' + token,
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
    name: "mainSlice",
    initialState: {
        accessToken: localStorage.getItem("ACCESS_TOKEN"),
        profile: JSON.parse(localStorage.getItem("PROFILE")),
        refreshToken: localStorage.getItem("REFRESH_TOKEN"),
        loading:false,
        error:"",
        doctors:[],
        currPatient:null,
        upcomingConsultations:[],
        pastConsultations:[],
        currentDoctor:null,
    },
    reducers: {
       setError:(state,action)=>{
          state.error = action.payload
       },
       setCurrentViewedDoctor:(state,action)=>{
        state.currentDoctor = state.doctors[action.payload]
       }
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
        builder.addCase(login.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(login.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false
            state.profile = action.payload.profile
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
            localStorage.setItem("PROFILE", JSON.stringify(action.payload.profile))
            localStorage.setItem("ACCESS_TOKEN", action.payload.accessToken)
            localStorage.setItem("REFRESH_TOKEN", action.payload.refreshToken)
        })
        builder.addCase(token.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(token.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(token.fulfilled, (state, action) => {
            state.loading = false
            state.accessToken = action.payload.accessToken
            localStorage.setItem("ACCESS_TOKEN", action.payload.accessToken)
        })
        builder.addCase(updateInformationDoctor.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(updateInformationDoctor.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(updateInformationDoctor.fulfilled, (state, action) => {
            state.loading = false
            state.profile = action.payload.data
            localStorage.setItem("PROFILE", action.payload.data)
        })
        builder.addCase(updatePatient.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(updatePatient.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(updatePatient.fulfilled, (state, action) => {
            state.loading = false
            state.profile = action.payload.data
        })
        builder.addCase(getDoctors.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(getDoctors.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(getDoctors.fulfilled, (state, action) => {
            state.loading = false
            console.log(action.payload)
            state.doctors = action.payload
        })
        builder.addCase(getSpecificPatient.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(getSpecificPatient.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(getSpecificPatient.fulfilled, (state, action) => {
            state.loading = false
            state.currPatient = action.payload.data
        })
        builder.addCase(rateDoctor.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(rateDoctor.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(rateDoctor.fulfilled, (state, action) => {
            state.loading = false
        })
        builder.addCase(bookDoctor.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(bookDoctor.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(bookDoctor.fulfilled, (state, action) => {
            state.loading = false
            state.upcomingConsultations.push(action.payload)
        })
        builder.addCase(prescribePatient.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(prescribePatient.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(prescribePatient.fulfilled, (state, action) => {
            state.loading = false
            let index = state.upcomingConsultations.findIndex(consultation=>action.payload.data.id===consultation.id)
            state.upcomingConsultations.splice(index,1)
            state.pastConsultations.push(action.payload)
        })
        builder.addCase(getAllBookingsDoctor.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(getAllBookingsDoctor.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(getAllBookingsDoctor.fulfilled, (state, action) => {
            state.loading = false
            state.pastConsultations =action.payload.filter(consultation=>consultation.status==="Completed")
            state.upcomingConsultations =action.payload.filter(consultation=>consultation.status==="Upcoming")
        })
        builder.addCase(getAllBookingsPatient.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(getAllBookingsPatient.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(getAllBookingsPatient.fulfilled, (state, action) => {
            state.loading = false
            state.pastConsultations =action.payload.filter(consultation=>consultation.status==="Completed")
            state.upcomingConsultations =action.payload.filter(consultation=>consultation.status==="Upcoming")
        })
    }
})
export const {setCurrentViewedDoctor,setError } = mainSlice.actions
export default mainSlice.reducer