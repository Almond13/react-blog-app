import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {postComment, updateComment} from "../api/postApi";
import {fetchCommentData, resetBox} from "../redux/modules/comment";

const AddComment = (props) => {
    const params = useParams()
    const dispatch = useDispatch()

    const commentData = useSelector(state => state.comment.commentData)
    const storeEdit = useSelector(state => state.comment.isEdit)
    const storeReply = useSelector(state => state.comment.isReply)
    const type = useSelector(state => state.comment.typeIndex)
    const postId = useSelector(state => state.detail.postId)
    const commentId = props.commentId
    const selectedComment = commentData.find(item => item.id === commentId)

    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [content, setContent] =useState('')

    const ResetAll = () => {
        dispatch(resetBox())
        setName('')
        setEmail('')
        setContent('')
    }

    const handleAddComment = async () => {
        storeReply[commentId] ?
            await postComment({postId, commentId, name, email, content}) :
            await postComment({postId, name, email, content})
        await dispatch(fetchCommentData(postId))
        ResetAll()
    }

    const handleEditComment = async () => {
        await updateComment({postId, commentId, name, email, content})
        await dispatch(fetchCommentData(postId))
        ResetAll()
    }

    useEffect( ()=> {
        if(storeEdit[commentId] && selectedComment !== undefined){
            setContent(selectedComment.content.rendered)
            setName(selectedComment.author_name)
            // setEmail(selectedComment.author_email)
        } else {
            setName('')
            setEmail('')
            setContent('')
        }
    },[storeEdit, commentId, selectedComment])

    return (
        <>
            <h2>{storeEdit[commentId]? '코멘트 수정' : '코멘트 추가'}</h2>
            <p>이름</p>
            <input value={name} onChange={(e) => {
                setName(e.target.value)
            }}/>
            <p>이메일</p>
            <input value={email} onChange={(e) => {
                setEmail(e.target.value)
            }}/>
            <p>내용</p>
            <input value={content} onChange={(e) => {
                setContent(e.target.value)
            }}/>
            {!storeEdit[commentId] ?
                <button onClick={() => handleAddComment()}>추가</button>
                : <button onClick={() => handleEditComment()}>업데이트</button>
            }

        </>
    )
}

export default AddComment
