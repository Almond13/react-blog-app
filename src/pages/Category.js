import React, {useEffect} from "react"
import {Link, Outlet, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {detailActions, fetchAboutData, resetDetail} from "../redux/modules/detail"
import {getPost} from "../api/getApi";

const Category = () => {
    const params = useParams()
    const location = useLocation()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.detail.loading)

    useEffect( () => {
        const pathCategory = () => {
            if (location.pathname.includes('grouped')) {
                return 1
            } else if (location.pathname.includes('test')) {
                return 2
            }
        }

        dispatch(detailActions.setLoading())
        dispatch(fetchAboutData({currentPage: params.page, perPage: 5, category: pathCategory()}))
        dispatch(detailActions.endLoading())

        return () => {
            dispatch(resetDetail())
        }
    }, [dispatch, params.page, location.pathname])

    if (loading) {
        return <p>대기중</p>
    }

    return (
        <>
            <h1>카테고리</h1>
            <Link to="/category/grouped/1" onClick={() => getPost({categories: 1})}>미분류</Link>
            <Outlet/>
        </>
    );
};

export default Category
