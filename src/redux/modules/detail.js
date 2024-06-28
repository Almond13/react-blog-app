import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getPost} from "../../api/getApi";

const initialState = {
    listData: [],
    listHeader: {},
    loading: false,
};

const detailSlice = createSlice({
    name: 'detail',
    initialState: initialState,
    reducers: {
        loadingStart(state) {
            state.loading = true;
        },
        getListData(state, action) {
            state.listData = action.payload.data;
            state.listHeader = { ...action.payload.headers }; // 직렬화 가능한 형태로 변환
            state.loading = false;
        },
        loadingFail(state) {
            state.loading = false;
        }
    }
});

export const detailActions = detailSlice.actions;

export const fetchListData = () => async (dispatch) => {
    dispatch(detailActions.loadingStart());
    try {
        const response = await getPost();
        dispatch(detailActions.getListData({ data: response.data, headers: { ...response.headers } })); // 직렬화 가능한 형태로 변환
    } catch (error) {
        console.log(error, '에러뜸');
        dispatch(detailActions.loadingFail());
    }
};

export default detailSlice.reducer