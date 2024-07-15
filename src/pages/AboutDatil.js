import React, { useEffect, useState } from "react"
import {Link, useLocation, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {getDetailNavigation, fetchDetailData, resetDetail} from "../redux/modules/detail";
import CommentWrap from "../components/CommentWrap";
import {fetchCommentData} from "../redux/modules/comment";
import {detailLinkPath, parsePath} from "../api/getLocation";

const Detail = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const parsed = parsePath(location.pathname.split('/'))

    const detailData = useSelector(state => state.detail.detailData)
    const postId = params.id
    const {prevPost, prevTitle, nextPost, nextTitle} = useSelector(state => state.detail.detailNavigation)

    useEffect(  ()=> {
        setLoading(true)
        dispatch(fetchDetailData(postId))
        dispatch(fetchCommentData(postId))
        dispatch(getDetailNavigation(parsed.name, postId))
        setLoading(false)

        console.log()
    },[dispatch, parsed.name, postId])

    //TODO: https://ko.react.dev/reference/react/useEffect#my-effect-keeps-re-running-in-an-infinite-cycle 대칭 확인
    useEffect(() => {
        return () => {
            dispatch(resetDetail())
        }
    }, [dispatch])

    const detailDate = () => {
        const dateObj = new Date(detailData.date)
        const options = {year: 'numeric', month: 'long', day: '2-digit'}
        return dateObj.toLocaleDateString('en-US', options)
    }

    if (loading) {
        return <p>대기중</p>
    }

    if (detailData.length === 0) {
        return null
    }

    return (
        <>
            <h1>{detailData.title.rendered}</h1>
            {detailDate()}
            <div dangerouslySetInnerHTML={{__html: detailData.content.rendered}}></div>
            <Link to={detailLinkPath(parsed, prevPost)}>&lt;이전글: {prevTitle}</Link>{' | '}
            <Link to={detailLinkPath(parsed, nextPost)}> {nextTitle} :다음글 &gt;</Link>
            <CommentWrap/>
        </>
    )
}

export default Detail
