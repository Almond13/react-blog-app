import {createSlice} from "@reduxjs/toolkit"
import {getPost, getDetail} from "../../api/getApi"
import {commentActions} from "./comment";

const initialState = {
    loading: false,
    aboutData: [],
    aboutHeader: {},
    detailData: [],
    postId : 0,
    currentPage: 0,
    detailNavigation: {
        prevPost: 0,
        prevTitle: '',
        nextPost: 0,
        nextTitle: ''
    }
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
        resetAboutData(state) {
            state.aboutData = initialState.aboutData
            state.aboutHeader = initialState.aboutHeader
        },
        resetDetailData(state) {
            state.detailData = initialState.detailData
            state.detailNavigation = initialState.detailNavigation
        },
        setDetailNavigation(state, action) {
            if (Number(state.aboutHeader['x-wp-total']) === 0) return

            const data = action.payload.data
            if(state.postId !== 0 || undefined) {
                const currentIndex = data.findIndex(item => item.id === state.postId)
                state.detailNavigation.prevPost = data[currentIndex <= 0 ? currentIndex : currentIndex - 1].id
                state.detailNavigation.prevTitle = currentIndex <= 0 ? null : data[currentIndex - 1].title.rendered
                state.detailNavigation.nextPost = data[currentIndex >= data.length - 1 ? currentIndex : currentIndex + 1].id
                state.detailNavigation.nextTitle = currentIndex >= data.length - 1 ? null : data[currentIndex + 1].title.rendered
            }
        },
    }
})

export const detailActions = detailSlice.actions

export const fetchAboutData = (props) => async (dispatch) => {
    try {
        const response = await getPost({
            currentPage: props.currentPage,
            perPage: props.perPage,
            categories: props.category,
        })
        await dispatch(
            detailActions.getAboutData({
                data: response.data,
                headers: { ...response.headers },
                current: props.currentPage
            })
        )
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

export const resetAbout = () => async (dispatch) => {
    dispatch(detailActions.resetAboutData())
}

export const getDetailNavigation = (pathname, postId) => async (dispatch) => {
    try{
        const response = await getPost({
            currentPage: 1,
            perPage: 100,
        })
        const currentCategory = response.data.find(item => item.id === Number(postId)).categories[0]
        const categoryData = pathname === 'category' ? response.data.filter(item => item.categories[0] === currentCategory) : response.data
        dispatch(detailActions.setDetailNavigation({data: categoryData}))
    } catch (error) {
        console.log(error)
    }
}

export default detailSlice.reducer
