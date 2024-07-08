import {createSlice} from "@reduxjs/toolkit"
import {getPost, getDetail} from "../../api/getApi"
import {commentActions} from "./comment";

const initialState = {
    loading: false,
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
        setLoading(state) {
            state.loading = true
        },
        endLoading(state){
            state.loading = false
        },
        getAboutData(state, action) {
            state.aboutData = action.payload.data
            state.aboutHeader = { ...action.payload.headers }
            state.currentPage = action.payload.current
        },
        getDetailData(state, action){
            state.detailData = action.payload.data
            state.postId = action.payload.data.id
        },
        resetDetailData(state) {
            state.detailData = initialState.detailData
            state.aboutData = initialState.aboutData
            state.aboutHeader = initialState.aboutData
        },
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

export const resetDetail = () => async (dispatch) => {
    dispatch(detailActions.resetDetailData())
    dispatch(commentActions.resetCommentData())
}

export default detailSlice.reducer
