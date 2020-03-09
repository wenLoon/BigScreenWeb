import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './../pages/Home/index';
import About from './../pages/About/index';

function router() {
    return (
        <Router>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
        </Router>);
}

export default router;
