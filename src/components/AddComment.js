import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {postComment} from "../api/postApi";

const AddComment = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const commentData = useSelector(state => state.comment.commentData)
    const postId = useSelector(state => state.detail.postId)

    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [content, setContent] =useState('')

    useEffect( ()=> {
    },[])


    return (
        <>
            <h2>코멘트 추가</h2>
            <input value={name} onChange={(e) => {
                setName(e.target.value)
            }}/>
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <input value={content} onChange={(e) => {
                setContent(e.target.value)
            }}/>
            <button onClick={() => postComment({postId, name, email, content})}>추가</button>
        </>
    )
}

export default AddComment
