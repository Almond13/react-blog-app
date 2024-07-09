import React, { useEffect, useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import {postComment, editComment} from "../api/postApi";
import {fetchCommentData, refreshBox} from "../redux/modules/comment";

const AddComment = (props) => {
    const dispatch = useDispatch()

    const commentData = useSelector(state => state.comment.commentData)
    const storeEdit = useSelector(state => state.comment.isEdit)
    const storeReply = useSelector(state => state.comment.isReply)
    const postId = useSelector(state => state.detail.postId)
    const commentId = props.commentId
    const selectedComment = commentData.find(item => item.id === commentId)

    const [name, setName] =useState('')
    const [email, setEmail] =useState('')
    const [content, setContent] =useState('')

    const ResetAll = () => {
        dispatch(refreshBox(postId))
        setName('')
        setEmail('')
        setContent('')
    }

    const handleAddComment = async () => {
        const parent = storeReply[commentId] ? commentId : 0
        await postComment({postId, parent, name, email, content})
        await ResetAll()
    }

    const handleEditComment = async () => {
        await editComment({postId, commentId, name, email, content})
        await dispatch(fetchCommentData(postId))
        ResetAll()
    }



    const title = () => {
        if(storeEdit[commentId]){
            return '댓글 수정'
        } else if(storeReply[commentId]) {
            return '대댓글 달기'
        } else {
            return '댓글 달기'
        }
    }

    useEffect( ()=> {
        const updateCommentData = () => {
            if(storeEdit[commentId] && selectedComment !== undefined){
                setContent(selectedComment.content.rendered.replace(/<\/?p>/g, ''))
                setName(selectedComment.author_name)
            } else {
                setName('')
                setEmail('')
                setContent('')
            }
        }
        updateCommentData()
    },[storeEdit, commentId, selectedComment])

    return (
        <>
            <h2>{title()}</h2>
            <p>이름</p>
            <input value={name} onChange={(e) => {
                setName(e.target.value)
            }}/>
            {!storeEdit[commentId] ?
                <>
                    <p>이메일</p>
                    <input value={email} onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                </>
                : null
            }
            <p>내용</p>
            <input value={content} onChange={(e) => {
                setContent(e.target.value)
            }}/>
            <div>
                {!storeEdit[commentId] ?
                    <button onClick={() => handleAddComment()}>추가</button>
                    : <button onClick={() => handleEditComment()}>업데이트</button>
                }
            </div>
        </>
    )
}

export default AddComment
