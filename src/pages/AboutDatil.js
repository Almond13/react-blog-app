import React, {useEffect, useState} from "react"
import {Link, useLocation, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getDetailNavigation, fetchDetailData, resetDetail} from "../redux/modules/detail";
import CommentWrap from "../components/CommentWrap";
import {fetchCommentData} from "../redux/modules/comment";
import {detailLinkPath, parsePath} from "../api/getLocation";
import {setDetailDate} from "../api/dateFormat";

const Detail = () => {
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const postId = params.id
    const parsed = parsePath(location.pathname.split('/'))

    const {prevPost, prevTitle, nextPost, nextTitle} = useSelector(state => state.detail.detailNavigation)
    const detailData = useSelector(state => state.detail.detailData)
    const detailDate = setDetailDate(detailData.date)

    useEffect(  ()=> {
        setLoading(true)
        dispatch(fetchDetailData(postId))
        dispatch(fetchCommentData(postId))
        dispatch(getDetailNavigation(parsed.name, postId))
        setLoading(false)

        return () => {
            dispatch(resetDetail())
        }
    },[dispatch, parsed.name, postId])

    if (loading) {
        return <p>대기중</p>
    }

    if (detailData.length === 0) {
        return null
    }

    return (
        <>
            <h1>{detailData.title.rendered}</h1>
            {detailDate}
            <div dangerouslySetInnerHTML={{__html: detailData.content.rendered}}></div>
            <Link to={detailLinkPath(parsed, prevPost)}>&lt;이전글: {prevTitle}</Link>{' | '}
            <Link to={detailLinkPath(parsed, nextPost)}> {nextTitle} :다음글 &gt;</Link>
            <CommentWrap/>
        </>
    )
}

export default Detail
