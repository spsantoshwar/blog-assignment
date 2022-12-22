import { Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import { getAllBlog } from './server/homeServer';
import Loader from "react-js-loader";

export default function HomePage() {
    const [countBlog, setCountBlog] = useState(0);
    const [blogList, setBlogList] = useState([]);
    const [blogListCategory, setBlogListCategory] = useState([]);
    const [category, setCategory] = useState([]);
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchAllBlog();
    }, []);
    const fetchAllBlog = () => {
        setLoader(true);
        getAllBlog(
            (success) => {
                if (success !== 'no data') {
                    filterData(success.entries)
                    setCountBlog(success.count);
                    setBlogList(success.entries);
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Data Not Found',
                    })
                }
                setLoader(false);
            },
            (error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error,
                })
                setLoader(false);
            }
        );
        // console.log(blogList)
    }

    const filterData = (data) => {
        // console.log(data.slice(0, 12));
        let newObj = [];
        let tempObj = [];
        data && data.map((value, key) => {
            newObj.push(value.Category);
            if (tempObj[value.Category] === undefined) {
                tempObj[value.Category] = [];
                tempObj[value.Category].push(value);
            }
            else {
                tempObj[value.Category].push(value);
            }
        })
        newObj = [...new Set(newObj)];
        setCategory(newObj)
        setBlogListCategory(tempObj);
    }
    if (loader) {
        return (
            <section section className="loader-section" >
                <div className={"item"}>
                    <Loader type="hourglass" bgColor={"#FFFFFF"} title={"Please wait..."} color={'#FFFFFF'} size={100} />
                </div>
            </section >
        )
    }
    else {
        return (
            <Fragment>
                <section className="home-section">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={5} >
                        {
                            blogList && blogList.splice(0, 16).map((value, key) => {
                                return (
                                    <Grid item sm={3}>
                                        <div className="blog-block"
                                        // style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}
                                        >
                                            <p className="cat">{value.Category}</p>
                                            <p className="desc">{value.Description}</p>
                                            <p className="link">
                                                <a href={value.Link} target="_blank" >More</a>
                                            </p>
                                        </div>
                                    </Grid>
                                )
                            })
                        }

                    </Grid>
                    <div className="category-block">
                        <h3>Category</h3>
                        <ul>
                            {
                                category && category.map((value, key) => {
                                    return (
                                        <li>
                                            <Link to={`/category/${value}`}>
                                                <span className='cat-name'>{value}</span>
                                                <span className='cat-count'>{blogListCategory[value].length}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>

                </section>
            </Fragment >
        )
    }

}
