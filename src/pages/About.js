import React, { useEffect, useState } from "react"
import axios from "axios"
import {Outlet, useParams} from "react-router-dom";

const api = process.env.REACT_APP_BLOG_API

const About = () => {
    // const [data, setData] = useState([])
    // const [header, setHeader] = useState({})
    // const [loading, setLoading] = useState(false)
    // const params = useParams()
    //
    // const getPost = async () => {
    //     try {
    //         return await axios.get(`${api}/posts`,{
    //             params: {
    //                 per_page : 5,
    //                 page : 1
    //             }
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // };
    //
    // useEffect(() => {
    //     setLoading(true)
    //     getPost().then((res) => {
    //         if (res.data.length > 0) {
    //             setData(res.data)
    //             setHeader(res.headers)
    //         }
    //         setLoading(false)
    //     });
    //     console.log(data)
    //     console.log(params)
    // }, [])
    //
    // if (loading) {
    //     return <p>대기중</p>
    // }
    //
    // if (data.length === 0) {
    //     return null
    // }

    return (
        <>
            <Outlet />
            {/*<h1>어바웃</h1>*/}
            {/*<p>첫 번째 데이터의 ID: {data[0].id}</p>*/}
        </>
    );
};

export default About
