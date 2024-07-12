import axios from "axios";
const api = process.env.REACT_APP_BLOG_API

export const getPost = async (props) => {
    try {
            return await axios.get(`${api}/posts`,{
                params: {
                    per_page : props.perPage || 5,
                    page : props.currentPage || 1,
                    categories: props.categories
                }
            })
    } catch (error) {
        console.log(error)
    }
}

export const getDetail = async (detailId) => {
    try {
        return await axios.get(`${api}/posts/${detailId}`)
    } catch (error) {
        console.log(error)
    }
}

export const getComment = async (postId) => {
    try {
        return await axios.get(`${api}/comments`,{
            params: {
                post: postId,
                order: 'asc',
                orderby: 'date',
                per_page: 100
            }
        })
    } catch (error) {
        console.log(error)
    }
}
