import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchDetailData} from "../redux/modules/detail";

const Detail = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const detailData = useSelector(state => state.detail.detailData)
    const detailDate = useSelector(state => state.detail.detailDate)


    useEffect( ()=> {
        setLoading(true)
        dispatch(fetchDetailData(params.id))
        setLoading(false)
    },[dispatch])

    if (loading) {
        return <p>대기중</p>
    }

    if (detailData.length === 0) {
        return null
    }

    return (
        <>
            <h1>{detailData.title.rendered}</h1>
            <div>{detailDate}</div>
            <div dangerouslySetInnerHTML={{__html: detailData.content.rendered}}></div>
        </>
    )
}

export default Detail
