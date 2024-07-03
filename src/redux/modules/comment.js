import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {getComment} from "../../api/getApi";

const initialState = {
    commentData: [],
    typeIndex : 1,
    edit: {},
    reply: {},
};

const commentSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {
        getCommentData(state, action) {
            state.commentData = action.payload.data
        },
        setEachData(state, action){
            state.edit[action.payload.editId] = false
            state.reply[action.payload.editId] = false
        }
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

export const eachCommentData = (id) => async (dispatch) => {
    try {
        dispatch(commentActions.setEachData({editId:id}))
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export default commentSlice.reducer
