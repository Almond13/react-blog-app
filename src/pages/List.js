import React, { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom"
import {useSelector} from "react-redux"
import Pagination from "../components/Pagination";

const List = () => {
    const params = useParams()

    const aboutData = useSelector((state) => state.detail.aboutData)
    const aboutHeader = useSelector((state) => state.detail.aboutHeader)

    useEffect(()=> {
    })
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
