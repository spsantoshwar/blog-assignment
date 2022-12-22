import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { homeRoute } from '../../routes/homeRoute'

export default function Header(props) {
    const [url, setURL] = useState([])
    useEffect(() => {
        let tempObj = [];
        homeRoute && homeRoute.map((value, key) => {
            tempObj.push(value.path)
        });
        setURL(tempObj)
    }, [])

    let homeUrl = [
        '/',
        '/home'
    ]
    let createUrl = [
        '/create-blog',
    ]
    let listUrl = [
        '/blog-list',
    ]

    return (
        <Fragment>
            {/* HomePage, CreateBlogPage, ListBlogsPage, View */}
            <section className="header-section">
                <ul>
                    <li>
                        <Link to="/home"
                            className={homeUrl.includes(props.location.pathname) ? 'active' : null}
                        >Home</Link>
                    </li>
                    <li>
                        <Link to="/create-blog"
                            className={createUrl.includes(props.location.pathname) ? 'active' : null}
                        >Create Blog</Link>
                    </li>
                    <li>
                        <Link to="/blog-list"
                            className={listUrl.includes(props.location.pathname) ? 'active' : null}
                        >List Blog</Link>
                    </li>
                </ul>
            </section>
        </Fragment>
    )
}
