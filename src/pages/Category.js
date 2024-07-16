import React, {useEffect} from "react"
import {Link, Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {fetchAboutData, resetAbout} from "../redux/modules/detail"

const Category = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.detail.loading)

    useEffect( () => {
        dispatch(fetchAboutData({currentPage: params.page, perPage: 5, category: params.sub}))

        return () => {
            dispatch(resetAbout())
        }
    }, [dispatch, params.page, params.sub])

    if (loading) {
        return <p>대기중</p>
    }

    return (
        <>
            <h1>카테고리</h1>
            <Link to="/category/unclassified/1">미분류</Link>{' '}
            <Link to="/category/test/1">test</Link>
            <Outlet/>
        </>
    );
};

export default Category
