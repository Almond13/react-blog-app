import axios from "axios";
import {fetchCommentData} from "../redux/modules/comment";
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

export const updateComment = async (props) => {
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