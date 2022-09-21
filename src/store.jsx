import { configureStore } from "@reduxjs/toolkit"
import mainSlice from "./slices/mainSlice"
const store = configureStore({
    reducer: {
        mainSlice: mainSlice
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //     serializableCheck: false
    // }
    // ),

})
export default store