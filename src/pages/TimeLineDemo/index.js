import React, { Component } from 'react';
import TimeLine from './../../component/timeLine/TimeLine';

export default class index extends Component {
    state = {
        numberStamp: 1,
        timeList: [{
            title:"基础信息",
            vice: false,
            img: process.env.PUBLIC_URL + 'logo192.png'
        }, {
            title:"党籍信息",
            vice: true,
            img: process.env.PUBLIC_URL + 'logo192.png'
        }, {
            title:"工作信息",
            vice: false,
            img: process.env.PUBLIC_URL + 'logo192.png'
        }, {
            title:"账号信息",
            vice: false,
            img: process.env.PUBLIC_URL + 'logo192.png'
        }],
    }
    timeHandleChange = () => {
        this.setState({
            numberStamp: this.state.numberStamp + 1
        })
    }
    render() {
        const { numberStamp, timeList } = this.state;
        return (
            <div>
                <TimeLine total={4} progress={numberStamp} timeList={timeList} />
                <button onClick={this.timeHandleChange} />
            </div>
            )
        }
    }
