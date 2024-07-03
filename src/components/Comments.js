import React, { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import {eachCommentData} from "../redux/modules/comment";
import AddComment from "./AddComment";

const CommentList = (props) => {
    const dispatch = useDispatch()

    const commentData = useSelector(state => state.comment.commentData)
    const storeEdit = useSelector(state => state.comment.edit)
    const storeReply = useSelector(state => state.comment.reply)

    useEffect( ()=> {
        commentData.forEach(item => {
            if(storeEdit[item.id] === undefined || storeReply[item.id] === undefined){
                dispatch(eachCommentData(item.id))
            }
        })
    },[storeEdit, storeReply, dispatch])

    const commentDate = (date) => {
        const [yy, mm, dd] = [date.slice(0,4),date.slice(5,7),date.slice(8,10)]
        return `${yy}년 ${mm}월 ${dd}일`
    }

    return (
        <>
            {commentData
                .filter(v=> v.parent === props.parent)
                .map((item) => (
                <div key={item.id} style={{margin: '10px', border: '1px solid gray'}}>
                    {item.id} {item.author_name} {commentDate(item.date)} 부모: {item.parent}
                    <div dangerouslySetInnerHTML={{__html: item.content.rendered}}></div>
                    <CommentList parent={item.id} />
                    <button>수정</button>
                    <button>대댓글</button>
                    <button>삭제</button>
                    {storeEdit[item.id] && <AddComment/>}
                </div>
            ))}
        </>
    )
}

export default CommentList
