import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {fetchDetailData} from "../redux/modules/detail";

const Detail = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const detailData = useSelector(state => state.detail.detailData)
    // const loading = useSelector((state) => state.detail.loading)

    useEffect(()=> {
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
            <h1>디테일</h1>
            {detailData.id}
        </>
    )
}

export default Detail
