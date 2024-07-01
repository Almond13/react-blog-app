import {configureStore} from "@reduxjs/toolkit"
import detailReducer from "../modules/detail"

const store = configureStore({
    reducer: {
        detail: detailReducer
    }
})

export default store