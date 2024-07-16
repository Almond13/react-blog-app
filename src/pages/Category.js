import React, {useEffect} from "react"
import {Link, Outlet, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {detailActions, fetchAboutData, resetAbout} from "../redux/modules/detail"
import {getPost} from "../api/getApi";

const Category = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const loading = useSelector(state => state.detail.loading)

    useEffect( () => {
        const pathCategory = () => {
            if (params.sub === 'unclassified') {
                return 1
            } else if (params.sub === 'test') {
                return 15
            }
        }

        dispatch(detailActions.setLoading())
        dispatch(fetchAboutData({currentPage: params.page, perPage: 5, category: pathCategory()}))
        dispatch(detailActions.endLoading())

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
            <Link to="/category/unclassified/1" onClick={() => getPost({categories: 1})}>미분류</Link>{' '}
            <Link to="/category/test/1" onClick={() => getPost({categories: 15})}>test</Link>
            <Outlet/>
        </>
    );
};

export default Category
