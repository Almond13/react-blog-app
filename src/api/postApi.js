import axios from "axios";
const api = process.env.REACT_APP_BLOG_API

export const postComment = async (props) => {
    try {
        return await axios.post(`${api}/comments`,{
                post: props.postId,
                parent: 0 || props.commentId,
                author_name: props.name,
                content: props.content,
                author_email: props.email
        })
    } catch (error) {
        console.log(error)
    }
}

export const editComment = async (props) => {
    try {
        return await axios.put(`${api}/comments/${props.commentId}`,{
            post: props.postId,
            id : props.commentId,
            author_name: props.name,
            content: props.content
        })
    } catch (error) {
        console.log(error)
    }
}

export const deleteComment = async (commentId) => {
    try {
        return await axios.delete(`${api}/comments/${commentId}`,{
        })
    } catch (error) {
        console.log(error)
    }
}
