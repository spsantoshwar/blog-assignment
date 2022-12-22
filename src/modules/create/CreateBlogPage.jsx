import { FormControlLabel, FormGroup, Grid, Switch, TextField } from '@mui/material';
import React, { Component, Fragment } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import Button from '@mui/material/Button';
import { createBlog } from './server/createBlogServer';
import Swal from 'sweetalert2';

export default class CreateBlogPage extends Component {
    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        window.scrollTo(0, 0);
        this.state = {
            formData: {
                title: '',
                description: "",
                creationDate: new Date(),
                publishBlog: false,
            },
        }
    }
    handleInputChanage = (e) => {
        let tempObj = this.state.formData;
        tempObj[e.target.name] = e.target.value;
        this.setState({
            formData: tempObj,
        });
    }

    onSubmit = () => {
        if (this.validator.allValid()) {
            this.validator.hideMessages();
            let tempObj = JSON.parse(JSON.stringify(this.state.formData))
            createBlog(
                tempObj,
                (success) => {
                    if (success === true) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Blog created successfully',
                        });
                        this.clearFields();
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: success,
                        })
                    }
                },
                (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error,
                    })
                },
            )
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    clearFields = () => {
        let tempObj = this.state.formData;
        tempObj['title'] = '';
        tempObj['description'] = '';
        tempObj['publishBlog'] = false;
        tempObj['creationDate'] = new Date();
        this.setState({
            formData: tempObj,
        })
    }
    render() {
        // console.log(this.state.formData)
        return (
            <Fragment>
                <section className="create-blog-section">
                    <h1 className="title">Create Blog</h1>
                    <Grid container spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={8}>
                            <div className="input-block">
                                <TextField
                                    id="outlined-basic"
                                    label="Title"
                                    variant="outlined"
                                    onChange={this.handleInputChanage}
                                    value={this.state.formData.title}
                                    name="title"
                                />
                                <span className="alert-block">
                                    {this.validator.message('title', this.state.formData.title, 'required')}
                                </span>
                            </div>
                        </Grid>

                        <Grid item xs={8}>
                            <div className="input-block">
                                <TextField
                                    id="outlined-multiline-flexible"
                                    label="Description"
                                    multiline
                                    maxRows={10}
                                    onChange={this.handleInputChanage}
                                    value={this.state.formData.description}
                                    name="description"
                                />
                                <span className="alert-block">
                                    {this.validator.message('description', this.state.formData.description, 'required')}
                                </span>
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <div className="">
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Switch checked={this.state.formData.publishBlog} />} label="Publish"
                                        name="publishBlog"
                                        onClick={(e) => {
                                            let tempObj = this.state.formData;
                                            tempObj["publishBlog"] = e.target.checked;
                                            this.setState({
                                                formData: tempObj,
                                            });
                                        }}
                                    />
                                </FormGroup>
                            </div>
                        </Grid>
                        <Grid item xs={8}>
                            <Button variant="contained"
                                onClick={this.onSubmit}
                            >Create</Button>
                        </Grid>
                    </Grid>



                </section>
            </Fragment>
        )
    }
}
