import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {getPost, getDetail} from "../../api/getApi"

const initialState = {
    aboutData: [],
    aboutHeader: {},
    detailData: [],
    detailDate: ''
};

const detailSlice = createSlice({
    name: 'detail',
    initialState: initialState,
    reducers: {
        getAboutData(state, action) {
            state.aboutData = action.payload.data
            state.aboutHeader = { ...action.payload.headers }
        },
        getDetailData(state, action){
            state.detailData = action.payload.data
        },
        setDetailDate(state,action){
            const dateObj = new Date(action.payload.data)
            const options = {year: 'numeric', month: 'long', day: '2-digit'}
            state.detailDate = dateObj.toLocaleDateString('en-US', options)
        }
    }
})

export const detailActions = detailSlice.actions

export const fetchAboutData = (page) => async (dispatch) => {
    try {
        const response = await getPost(page)
        dispatch(detailActions.getAboutData({ data: response.data, headers: { ...response.headers } }))
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export const fetchDetailData = (id) => async (dispatch) => {
    try {
        const response = await getDetail(id)
        dispatch(detailActions.getDetailData({ data: response.data}))
        dispatch(detailActions.setDetailDate({data:response.data.date}))
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export default detailSlice.reducer
