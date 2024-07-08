import React, { useEffect } from "react"
import {Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {detailActions, fetchAboutData} from "../redux/modules/detail"

const About = () => {
    const params = useParams()
    const dispatch = useDispatch()

    const loading = useSelector(state => state.detail.loading)
    const aboutData = useSelector((state) => state.detail.aboutData)

    useEffect( () => {
        dispatch(detailActions.setLoading())
        dispatch(fetchAboutData(params.page))
        dispatch(detailActions.endLoading())
    }, [dispatch, params.page])

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
