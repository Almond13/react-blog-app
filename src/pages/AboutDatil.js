import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchDetailData, resetAbout} from "../redux/modules/detail";
import CommentWrap from "../components/CommentWrap";

const Detail = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const detailData = useSelector(state => state.detail.detailData)
    const commentData = useSelector(state => state.comment.commentData)
    const aboutData = useSelector((state) => state.detail.aboutData)



    useEffect(  ()=> {
        const loadData = async () => {
            setLoading(true);
            await dispatch(fetchDetailData(params.id));
            dispatch(resetAbout());
            setLoading(false);
        }
        loadData().then()
    },[dispatch, params.id])

    const detailDate = () => {
        const dateObj = new Date(detailData.date)
        const options = {year: 'numeric', month: 'long', day: '2-digit'}
        return dateObj.toLocaleDateString('en-US', options)
    }

    if (loading) {
        return <p>대기중</p>
    }

    if (detailData.length === 0 && commentData.length === 0) {
        return null
    }

    return (
        <>
            <h1>{detailData.title.rendered}</h1>
            {detailDate()}
            <div dangerouslySetInnerHTML={{__html: detailData.content.rendered}}></div>
            <CommentWrap/>
        </>
    )
}

export default Detail
