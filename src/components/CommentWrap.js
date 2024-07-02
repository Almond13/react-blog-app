import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchCommentData} from "../redux/modules/comment";
import CommentList from "./Comments";

const CommentWrap = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const commentData = useSelector(state => state.comment.commentData)

    useEffect( ()=> {
        setLoading(true)
        dispatch(fetchCommentData(params.id))
        setLoading(false)
    },[dispatch])

    if (loading) {
        return <p>대기중</p>
    }

    if (commentData.length === 0) {
        return null
    }

    return (
        <>
            <h1>코멘트</h1>
            <CommentList parent={0}/>
        </>
    )
}

export default CommentWrap
