import React from "react"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"
import Pagination from "../components/Pagination";

const List = () => {

    const aboutData = useSelector((state) => state.detail.aboutData)

    return (
        <>
            <h1>어바웃</h1>
            {aboutData.map((item) => (
                <div key={item.id}>
                    <Link to={`/about/post/${item.id}`} >
                        {item.id} / {item.title.rendered}
                    </Link>
                </div>
            ))}
            <Pagination />
        </>
    )
}

export default List
