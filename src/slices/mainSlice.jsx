import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
let baseURL = "https://consultation-app.onrender.com"
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
export const sendResetCode = createAsyncThunk(
    "auth / send / code",
    async (data) => {
        console.log(data)
        let res = await fetch(baseURL + "auth/sendCode", {
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
export const resetPass = createAsyncThunk(
    "auth / reset / pass",
    async (data) => {
        console.log(data)
        let res = await fetch(baseURL + "auth/reset-pass", {
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
    async (id, { getState }) => {
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "patient/" + id, {
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
            body: JSON.stringify(data.values),
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
            body: JSON.stringify(data.values),
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
    async (id, { getState }) => {
        console.log(id)
        //Patient id
        let token = getState().mainSlice.accessToken
        let res = await fetch(baseURL + "consultation/patient/" + id, {
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
        availableSlots:null,
        currSlotChips:[],
        bookedSlots:{},
        consultationsToDisplay : "upcoming",
        feedbacksOfCurrDoc:[]
    },
    reducers: {
       setError:(state,action)=>{
          state.error = action.payload
       },
       setCurrentViewedDoctor:(state,action)=>{
        state.currentDoctor = state.doctors[action.payload]
       },
       setConsultaionMode:(state,action)=>{
        state.consultationsToDisplay = action.payload
       },
       calculateAvailableSlots:(state,action)=>{
        let selectedDate = String(action.payload)
        console.log(selectedDate)
        if(state.currentDoctor){
         let selectedDay = selectedDate.split(" ")[0]
         if(selectedDay.toLocaleLowerCase()==="sat"||selectedDay.toLocaleLowerCase()==="sun"){
            state.currSlotChips = []
         }
         else{
             let availableSlots = JSON.parse(state.currentDoctor.availableSlots)
             let slotsOnCurrentDay = []
             for(let day in availableSlots){
                if(day.startsWith(selectedDay)){
                    slotsOnCurrentDay =availableSlots[day]
                    break
                }
             }
             let timeDivisions=[]
             console.log(slotsOnCurrentDay)
             slotsOnCurrentDay.forEach(range=>{
               let startHour = range[0].split(":")[0]
               let endHour = range[1].split(":")[0]
               let startMinutes = range[0].split(":")[1]
               let endMinutes = range[1].split(":")[1]
               if(Number(endHour)>Number(startHour))
               while((startHour<endHour||startMinutes<endMinutes)&&startHour<=24){
                 let startTime = `${startHour}:${startMinutes}`
                 if((Number(startMinutes)+30)<60){
                     startMinutes = Number(startMinutes)+30
                 }
                else if((Number(startMinutes)+30)>=60){
                    startMinutes = Number(startMinutes)+30-60
                    startHour = Number(startHour)+1
                }
                if(String(startMinutes).length===1){
                    startMinutes= "0"+startMinutes
                }
                if(String(startHour).length===1){
                    startHour= "0"+startHour
                }
                let endTime = `${startHour}:${startMinutes}`
                // console.log(startMinutes,)
                timeDivisions.push([startTime,endTime])
               }
               state.currSlotChips = timeDivisions
             })
            }
           }
         }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(createUser.rejected, (state, action) => {
            state.error = action.error.message
            console.log(state.error)
            throw new Error(state.error)
        })
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.loading = false
            // state.error = ""
        })
        builder.addCase(sendResetCode.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(sendResetCode.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(sendResetCode.fulfilled, (state, action) => {
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
            state.currPatient = action.payload
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
            let index =state.pastConsultations.findIndex(cons=>cons.id===action.payload.id)
            state.pastConsultations[index] = action.payload
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
            let feedbacks = []
            state.pastConsultations.forEach(booking=>{
                if(booking.feedback){
                    feedbacks.push([booking.feedback,booking.rating])
                }
            })
            state.feedbacksOfCurrDoc = feedbacks
           state.upcomingConsultations.forEach(booking=>{
            let bookingObj = JSON.parse(booking.date)
            let date = Object.keys(bookingObj)[0]
            if(state.bookedSlots.hasOwnProperty(date)){
                 state.bookedSlots[date].push(bookingObj[date])
            }
            else{
                state.bookedSlots[date] = [bookingObj[date]]
            }
           })
           console.log(current(state.bookedSlots))
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
            console.log(state.pastConsultations)
        })
        builder.addCase(resetPass.pending, (state, action) => {
            state.loading = true
            // state.error = ""
        })
        builder.addCase(resetPass.rejected, (state, action) => {
            state.error = action.error.message
            throw new Error(state.error)
        })
        builder.addCase(resetPass.fulfilled, (state, action) => {
            state.loading = false
        })
    }
})
export const {setCurrentViewedDoctor,setError,calculateAvailableSlots,setConsultaionMode} = mainSlice.actions
export default mainSlice.reducer
