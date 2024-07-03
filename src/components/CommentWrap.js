import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchCommentData} from "../redux/modules/comment";
import CommentList from "./Comments";
import AddComment from "./AddComment";

const CommentWrap = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const commentData = useSelector(state => state.comment.commentData)
    const postId = useSelector(state => state.detail.postId)
    const type = useSelector(state => state.comment.typeIndex)

    useEffect( ()=> {
        setLoading(true)
        dispatch(fetchCommentData(postId))
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
            <h2>코멘트</h2>
            <CommentList parent={0}/>
            {type > 0 &&
                <AddComment isEdit={false}/>
            }

        </>
    )
}

export default CommentWrap
