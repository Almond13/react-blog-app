import React from "react"
import {Link, useLocation} from "react-router-dom"
import {useSelector} from "react-redux"
import Pagination from "../components/Pagination";
import {parsePath, detailLinkPath} from "../api/getLocation";

const List = () => {
    const location = useLocation()
    const parsed = parsePath(location.pathname.split('/'))

    const aboutData = useSelector((state) => state.detail.aboutData)

    if (aboutData.length === 0) {
        return null
    }

    return (
        <>
            {aboutData.map((item) => (
                <div key={item.id}>
                    <Link to={detailLinkPath(parsed, item.id)}>
                        {item.id} / {item.title.rendered}
                    </Link>
                </div>
            ))}
            <Pagination />
        </>
    )
}

export default List
