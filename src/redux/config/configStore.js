import {configureStore} from "@reduxjs/toolkit";
// import {counterActions} from "../modules/detail";
import counterReducer from "../modules/detail"

const store = configureStore({
    reducer: {
        counter: counterReducer
    }
})

export default store