import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getPost} from "../../api/getApi";

const initialState = {
    aboutData: [],
    aboutHeader: {},
    loading: false,
};

const detailSlice = createSlice({
    name: 'detail',
    initialState: initialState,
    reducers: {
        loadingStart(state) {
            state.loading = true
        },
        getAboutData(state, action) {
            state.aboutData = action.payload.data
            state.aboutHeader = { ...action.payload.headers }
            state.loading = false
        },
        loadingFail(state) {
            state.loading = false
        }
    }
})

export const detailActions = detailSlice.actions

export const fetchAboutData = () => async (dispatch) => {
    dispatch(detailActions.loadingStart())
    try {
        const response = await getPost()
        dispatch(detailActions.getAboutData({ data: response.data, headers: { ...response.headers } }))
    } catch (error) {
        console.log(error, '에러뜸')
        dispatch(detailActions.loadingFail())
    }
}

export default detailSlice.reducer
