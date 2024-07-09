import React from "react"
import { useSelector} from "react-redux"
import CommentList from "./Comments";
import AddComment from "./AddComment";

const CommentWrap = () => {
    const commentData = useSelector(state => state.comment.commentData)
    const type = useSelector(state => state.comment.typeIndex)

    if (commentData.length === 0) {
        return (
            <>
            <h2>코멘트</h2>
                <div>댓글이 없습니다.</div>
            </>
        )
    }

    return (
        <>
            <h2>코멘트</h2>
            <CommentList parent={0}/>
            {type > 0 &&
                <AddComment/>
            }
        </>
    )
}

export default CommentWrap
