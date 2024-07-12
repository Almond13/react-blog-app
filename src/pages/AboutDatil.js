import React, { useEffect, useState } from "react"
import {Link, useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {detailNavigation, fetchDetailData, resetDetail} from "../redux/modules/detail";
import CommentWrap from "../components/CommentWrap";
import {fetchCommentData} from "../redux/modules/comment";

const Detail = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const detailData = useSelector(state => state.detail.detailData)
    const postId = params.id
    const prevLink = useSelector(state => state.detail.prevPost)
    const prevTitle = useSelector(state => state.detail.prevTitle)
    const nextLink = useSelector(state => state.detail.nextPost)
    const nextTitle = useSelector(state => state.detail.nextTitle)


    useEffect(  ()=> {
        setLoading(true)
        dispatch(fetchDetailData(postId))
        dispatch(fetchCommentData(postId))
        dispatch(detailNavigation())
        setLoading(false)
    },[dispatch, params.id, postId])

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
            <Link to={`/about/post/${prevLink}`}>&lt;이전글: {prevTitle}</Link>
            <Link to={`/about/post/${nextLink}`}> {nextTitle} :다음글 &gt;</Link>
            <CommentWrap/>
        </>
    )
}

export default Detail
