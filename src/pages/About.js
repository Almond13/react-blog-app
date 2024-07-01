import React, { useEffect, useState } from "react"
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {fetchAboutData} from "../redux/modules/detail"

const About = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const aboutData = useSelector((state) => state.detail.aboutData)
    const aboutHeader = useSelector((state) => state.detail.aboutHeader)

    useEffect(() => {
        setLoading(true)
        dispatch(fetchAboutData(params.page))
        setLoading(false)
    }, [dispatch])

    if (loading) {
        return <p>대기중</p>
    }

    if (aboutData.length === 0) {
        return null
    }

    return (
        <>
            <Outlet />
        </>
    );
};

export default About
