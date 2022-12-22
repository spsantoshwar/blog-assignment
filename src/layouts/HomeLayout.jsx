import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import Footer from '../modules/layouts/Footer';
import Header from '../modules/layouts/Header';
import { homeRoute } from '../routes/homeRoute';

export default function HomeLayout(props) {
    useEffect(() => {

    }, [])

    return (
        <>
            <section className="home-layout-section">
                <Header
                    {...props}
                />
                <Switch>
                    {
                        homeRoute && homeRoute.map((prop, key) => {
                            if (prop.redirect) {
                                return <Redirect from={prop.path} to={prop.pathTo} key={key} />;
                            } else {
                                return <Route path={prop.path} component={prop.component} key={key} />
                            }
                        })
                    }
                </Switch>
            </section>
        </>
    )
}
