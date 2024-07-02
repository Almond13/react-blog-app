import axios from "axios";
const api = process.env.REACT_APP_BLOG_API

export const postComment = async (props) => {
    try {
        return await axios.post(`${api}/comments`,{
            params: {
                post: props.postId,
                parent: 0,
                author_name: props.name,
                content: props.content,
                author_email: props.email
            }
        })
    } catch (error) {
        console.log(error)
    }
}