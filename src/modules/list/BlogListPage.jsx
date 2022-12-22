import { Grid } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Loader from "react-js-loader";
import MUIDataTable from "mui-datatables";
import { getAllBlog } from '../home/server/homeServer';

export default function BlogListPage() {

    const [blogList, setBlogList] = useState([]);
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
    }
    const options = {
        download: false,
        filter: true,
        print: false,
        pagination: true,
        rowsPerPage: 10,
        rowsPerPageOptions: [5, 10, 20, 50, 100, 150, 200, 300, 500],
        search: true,
        viewColumns: false,
        selectableRows: false,
        onRowsDelete: false,
    };
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
            <section className='blog-list-section'>
                <h1 className="title">Blog List</h1>
                <Grid container spacing={2}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={8}>
                        <div className="table-block">
                            <MUIDataTable
                                // title={"Employee List"}
                                data={blogList}
                                options={options}
                                columns={
                                    [
                                        {
                                            label: "Description",
                                            name: "Description",
                                            options: {
                                                customBodyRender: (value, tableMeta, updateValue) => {
                                                    return (
                                                        <>
                                                            <span>{value}</span>
                                                        </>
                                                    );
                                                }
                                            },
                                        },
                                        {
                                            label: "Category",
                                            name: "Category",
                                            options: {
                                                customBodyRender: (value, tableMeta, updateValue) => {
                                                    return (
                                                        <>
                                                            <span>{value}</span>
                                                        </>
                                                    );
                                                }
                                            },
                                        },
                                    ]
                                }

                            />
                        </div>
                    </Grid>
                </Grid>

            </section>
        )
    }
}
