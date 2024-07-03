import {Link} from "react-router-dom";
import React from "react";
import {useSelector} from "react-redux";

const Pagination = () => {
    const totalPage = Number(useSelector((state) => state.detail.aboutHeader['x-wp-totalpages']))
    const currentPage = Number(useSelector((state) => state.detail.currentPage))

    const pageGroup = () => {
        const startPage = Math.floor((currentPage - 1) / 5) * 5 + 1
        const endPage = Math.min(startPage + 4, totalPage)
        return { startPage, endPage }
    }
    const paging = Array.from({ length: pageGroup().endPage }, (_, index) => index + 1);

    return (
        <div className="pagination">
            <Link to="/about/1">처음으로</Link>
            <Link to={`/about/${currentPage > 1 ? currentPage -1 : 1}`}>이전</Link>
            {paging.map((number)=> (
                <div key={number} style={{display:'inline-flex', padding: '5px'}}>
                    <Link to={`/about/${number}`}>{number}</Link>
                </div>
            ))}
            <Link to={`/about/${currentPage < totalPage ? currentPage + 1 : totalPage}`}>다음</Link>
            <Link to={`/about/${pageGroup().endPage}`}>마지막으로</Link>
        </div>
    )
}

export default Pagination
