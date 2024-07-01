import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getPost, getDetail} from "../../api/getApi";

const initialState = {
    aboutData: [],
    aboutHeader: {},
    loading: false,
    detailData: []
};

const detailSlice = createSlice({
    name: 'detail',
    initialState: initialState,
    reducers: {
        loadingStart(state) {
            state.loading = true
            console.log(state.loading)
        },
        getAboutData(state, action) {
            state.aboutData = action.payload.data
            state.aboutHeader = { ...action.payload.headers }
            state.loading = false
        },
        loadingFail(state) {
            state.loading = false
            console.log(state.loading)
        },
        getDetailData(state, action){
            state.detailData = action.payload.data
            state.loading = false
        },
    }
})

export const detailActions = detailSlice.actions

export const fetchAboutData = (page) => async (dispatch) => {
    // dispatch(detailActions.loadingStart())
    try {
        const response = await getPost(page)
        dispatch(detailActions.getAboutData({ data: response.data, headers: { ...response.headers } }))
        // dispatch(detailActions.loadingFail())
    } catch (error) {
        console.log(error, '에러뜸')
        // dispatch(detailActions.loadingFail())
    }
}

export const fetchDetailData = (id) => async (dispatch) => {
    // dispatch(detailActions.loadingStart())
    try {
        const response = await getDetail(id)
        dispatch(detailActions.getDetailData({ data: response.data}))

        console.log(response.data)
        // dispatch(detailActions.loadingFail())
    } catch (error) {
        console.log(error, '에러뜸')
        // dispatch(detailActions.loadingFail())
    }
}

export default detailSlice.reducer
