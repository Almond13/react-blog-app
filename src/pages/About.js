import React, { useEffect } from "react"
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {fetchAboutData, resetAbout} from "../redux/modules/detail"

const About = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const loading = useSelector(state => state.detail.loading)

    useEffect( () => {
        dispatch(fetchAboutData({currentPage: params.page, perPage: 5}))

        return () => {
            dispatch(resetAbout())
        }
    }, [dispatch, params.page])

    if (loading) {
        return <p>대기중</p>
    }

    return (
        <>
            <h1>어바웃</h1>
            <Outlet/>
        </>
    );
};

export default About
