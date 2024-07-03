import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {getPost, getDetail} from "../../api/getApi"

const initialState = {
    aboutData: [],
    aboutHeader: {},
    detailData: [],
    postId : 0,
    currentPage: 0
}

const detailSlice = createSlice({
    name: 'detail',
    initialState: initialState,
    reducers: {
        getAboutData(state, action) {
            state.aboutData = action.payload.data
            state.aboutHeader = { ...action.payload.headers }
            state.currentPage = action.payload.current
        },
        getDetailData(state, action){
            state.detailData = action.payload.data
            state.postId = action.payload.data.id
        },
        resetAboutData(state) {
            // state.aboutData = action.payload.data
            // state.aboutHeader = {...action.payload.headers}
            state.aboutData = initialState.aboutData
            state.aboutHeader = initialState.aboutHeader
        },
        resetDetailData(state) {
            state.detailData = initialState.detailData
        }
    }
})

export const detailActions = detailSlice.actions

export const fetchAboutData = (page) => async (dispatch) => {
    try {
        const response = await getPost(page)
        dispatch(detailActions.getAboutData({ data: response.data, headers: { ...response.headers }, current: page }))
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export const fetchDetailData = (id) => async (dispatch) => {
    try {
        const response = await getDetail(id)
        dispatch(detailActions.getDetailData({ data: response.data}))
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export const resetAbout = () => async (dispatch) => {
    // dispatch(detailActions.resetAboutData({data: initialState.aboutData, headers: { ...initialState.aboutHeader }}))
    dispatch(detailActions.resetAboutData())
}

export const resetDetail = () => async (dispatch) => {
    dispatch(detailActions.resetAboutData())
}
export default detailSlice.reducer
