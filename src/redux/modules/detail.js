import {createSlice} from "@reduxjs/toolkit";

// 초기 상태값
const initialState = {
    number: 0,
};

const counterSlice = createSlice({
    name: 'counter',
    initialState: initialState,
    reducers: {
        increment(state){state.number++}
    }
})

export const counterActions = counterSlice.actions
export default counterSlice.reducer