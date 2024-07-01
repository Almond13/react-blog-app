import React, { useEffect, useState } from "react"
import axios from "axios"
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {detailActions, fetchAboutData} from "../redux/modules/detail"

const About = () => {
    const dispatch = useDispatch()

    const aboutData = useSelector((state) => state.detail.aboutData)
    const aboutHeader = useSelector((state) => state.detail.aboutHeader)
    const loading = useSelector((state) => state.detail.loading)

    useEffect(() => {
        dispatch(fetchAboutData())
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
