import axios from "axios";
const api = process.env.REACT_APP_BLOG_API

export const getPost = async () => {
    try {
        return await axios.get(`${api}/posts`,{
            params: {
                per_page : 5,
                page : 1
            }
        })
    } catch (error) {
        console.log(error)
    }
}