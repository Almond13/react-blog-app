import React, { useEffect, useState } from "react"
import {useParams} from "react-router-dom";
import {getPost} from "../api/getApi";
import {useDispatch, useSelector} from "react-redux";
import {counterActions} from "../redux/modules/detail";


const List = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const [data, setData] = useState([])
    const [header, setHeader] = useState({})
    const [loading, setLoading] = useState(false)

    const number = useSelector((state) => state.counter.number)
    const handleIncrement = () => {
        dispatch(counterActions.increment())
    }

    useEffect(() => {
        setLoading(true)
        getPost().then((res) => {
            if (res.data.length > 0) {
                setData(res.data)
                setHeader(res.headers)
            }
            setLoading(false)
        });
        console.log(data)
        console.log(params)
    }, [])

    if (loading) {
        return <p>대기중</p>
    }

    if (data.length === 0) {
        return null
    }

    return (
        <>
            <h1>어바웃</h1>
            <p>첫 번째 데이터의 ID: {data[0].id}</p>
            <button onClick={handleIncrement}>{number}</button>
        </>
    );
};

export default List
