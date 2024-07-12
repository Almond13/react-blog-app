import {Link, useLocation} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

const Pagination = () => {
    const location = useLocation()
    const parsePath = () => {
        const [ , name, sub, page ] = location.pathname.split('/')
        return { name, sub, page}
    }
    const { name, sub, page } = parsePath()

    const linkPath = (pageNum) => {
        return page !== undefined ? `/${name}/${sub}/${pageNum}` : `/${name}/${pageNum}`;
    }

    const totalPage = Number(useSelector((state) => state.detail.aboutHeader['x-wp-totalpages']))
    const currentPage = Number(useSelector((state) => state.detail.currentPage))

    const pageGroup = () => {
        const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1
        const endPage = Math.min(startPage + 4, totalPage)
        return { startPage, endPage }
    }
    const { startPage, endPage } = pageGroup()
    const paging = Array.from({ length: endPage }, (_, index) => index + 1);

    return (
        <div className="pagination">
            <Link to={linkPath(1)}>처음으로</Link>
            <Link to={linkPath(currentPage > 1 ? currentPage -1 : 1)} >이전</Link>
            {paging.map((number)=> (
                <div key={number} style={{display:'inline-flex', padding: '5px'}}>
                    <Link to={linkPath(number)}>{number}</Link>
                </div>
            ))}
            <Link to={linkPath(currentPage < totalPage ? currentPage + 1 : totalPage)}>다음</Link>
            <Link to={linkPath(endPage)}>마지막으로</Link>
        </div>
    )
}

export default Pagination
