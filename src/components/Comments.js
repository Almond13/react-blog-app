import React, { useEffect, useState } from "react"
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"

const CommentList = (props) => {
    const params = useParams()
    const dispatch = useDispatch()

    const commentData = useSelector(state => state.comment.commentData)

    useEffect( ()=> {
    },[])

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
                </div>
            ))}
        </>
    )
}

export default CommentList
