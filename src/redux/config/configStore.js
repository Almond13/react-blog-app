import {configureStore} from "@reduxjs/toolkit"
import detailReducer from "../modules/detail"
import commentReducer from "../modules/comment"

const store = configureStore({
    reducer: {
        detail: detailReducer,
        comment: commentReducer
    }
})

export default store