import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {getComment} from "../../api/getApi";

const initialState = {
    commentData: [],
};

const commentSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {
        getCommentData(state, action) {
            state.commentData = action.payload.data
        },
    }
})

export const commentActions = commentSlice.actions

export const fetchCommentData = (id) => async (dispatch) => {
    try {
        const response = await getComment(id)
        dispatch(commentActions.getCommentData({ data: response.data }))
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export default commentSlice.reducer
