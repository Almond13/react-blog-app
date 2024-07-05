import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {getComment} from "../../api/getApi";

const initialState = {
    commentData: [],
    typeIndex : 1,
    isEdit: {},
    isReply: {},
};

const commentSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {
        getCommentData(state, action) {
            state.commentData = action.payload.data
        },
        setEachData(state, action){
            state.isEdit[action.payload.selectedId] = false
            state.isReply[action.payload.selectedId] = false
        },
        resetCommentData(state) {
            state.commentData = initialState.commentData
            state.typeIndex = initialState.typeIndex
            state.isEdit = initialState.isEdit
            state.isReply = initialState.isReply
        },
        editToggle(state, action){
            Object.keys(state.isEdit).forEach(id => {
                state.isEdit[id] = id === action.payload.selectedId.toString() ? !state.isEdit[id] : false
                state.isReply[id] = false
            })
            !state.isEdit[action.payload.selectedId] ? state.typeIndex = 1 : state.typeIndex = -1
        },
        replyToggle(state, action){
            Object.keys(state.isReply).forEach(id => {
                state.isReply[id] = id === action.payload.selectedId.toString() ? !state.isReply[id] : false
                state.isEdit[id] = false
            })
            !state.isReply[action.payload.selectedId] ? state.typeIndex = 1 : state.typeIndex = -1
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
        dispatch(commentActions.setEachData({selectedId:id}))
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export const showEditBox = (id) => async (dispatch) => {
    try {
        dispatch(commentActions.editToggle({selectedId:id}))
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export const showReplyBox = (id) => async (dispatch) => {
    try {
        dispatch(commentActions.replyToggle({selectedId:id}))
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export const resetBox = () => async (dispatch) => {
    try {
        dispatch(commentActions.resetCommentData())
    } catch (error) {
        console.log(error, '에러 발생')
    }
}

export default commentSlice.reducer
