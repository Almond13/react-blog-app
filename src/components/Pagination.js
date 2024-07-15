import {Link, useLocation} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";
import {parsePath,linkPath} from "../api/getLocation";

const Pagination = () => {
    const location = useLocation()
    const parsed = parsePath(location.pathname.split('/'))

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
            <Link to={linkPath(parsed,1)}>처음으로</Link>
            <Link to={linkPath(parsed,currentPage > 1 ? currentPage -1 : 1)} >이전</Link>
            {paging.map((number)=> (
                <div key={number} style={{display:'inline-flex', padding: '5px'}}>
                    <Link to={linkPath(parsed, number)}>{number}</Link>
                </div>
            ))}
            <Link to={linkPath(parsed, currentPage < totalPage ? currentPage + 1 : totalPage)}>다음</Link>
            <Link to={linkPath(parsed, endPage)}>마지막으로</Link>
        </div>
    )
}

export default Pagination
