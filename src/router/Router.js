import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './../pages/Home/index';
import About from './../pages/About/index';
import G2Component from './../pages/G2Component/index';
import MapInfo from './../pages/MapInfo/index';
import WebSocket from '../pages/webSocket/index';
import TimeLineDemo from './../pages/TimeLineDemo/index';

function router() {
    return (
        <Router>
            {/* <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path='/g2' component={G2Component} />
            <Route page="/mapgl" component={MapInfo} />
            <Route page='/webSocket' component={WebSocket} /> */}
            <Route page='/timeLineDemo' component={TimeLineDemo} />
        </Router>);
}

export default router;
