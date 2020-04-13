import React, { Component } from 'react';
import ReactParticleLine from 'react-particle-line';
// import animate from 'animate.css';
import Header from './../Header/index';
import TableList from './../TableList/index';
import G2Component from './../G2Component/index';
import Slider from './../Slider/index';
import VideoPlay from './../VideoPlay/index';
import MapInfo from './../MapInfo/index';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import styles from './index.scss';

export default class index extends Component {

    state = {
        marks: {},
        dataSource: [
            {
                key: '1',
                name: '张三',
                age: 32,
                address: '八里屯',
            },
            {
                key: '2',
                name: '李四',
                age: 42,
                address: '高老庄',
            },
        ],
        taskMap: ''
    }

    //切换天时分，初始化
    handleChangeTimeSite = timeSelect => {
        let marks = {};
        switch (timeSelect) {
            case 'day':
                marks = {
                    0: '2020-01-01',
                    25: '2020-01-02',
                    50: '2020-01-03',
                    75: '2020-01-04',
                }
                this.setState({ marks })
                break;
            case 'hour':
                for (let index = 0; index < 24; index++) {
                    marks[index * (100 / 24)] = index;
                }
                this.setState({ marks })
                break;
            case 'minute':
                for (let index = 0; index < 24 * 60; index++) {
                    marks[index * (100 / 1440)] = index;
                }
                this.setState({ marks })
                break;
            default:
                break;
        }
        this.setState();
    }
    //清除计时
    sliderHandleChange = (valueList = [], intval = {}) => {
        clearInterval(intval);
        //指定时间执行指定任务
        this.getcurrentTesk();
    }
    //指定时间执行指定任务
    getcurrentTesk = () => {  
        console.log("ta")
        this.setState({
            taskMap: '1',
            dataSource: [{
                key: '1',
                name: '王五',
                age: 32,
                address: '成都',
            },
            {
                key: '2',
                name: '周六',
                age: 42,
                address: '武汉',
            }]
        });
        document.getElementById("replay").click();
    }
    componentDidMount() {
        this.handleChangeTimeSite("day");
    }
    render() {
        const { marks, dataSource, taskMap } = this.state;

        return (
            <ReactParticleLine className={'particleLine'}>
                <div className={"homeBox"}>
                    <div className={"homeBoxheader"}>
                        <Header />
                    </div>
                    <div className={"homeBoxtopLeft"}>
                        <TableList dataSource={dataSource} />
                    </div>
                    <div className={"homeBoxtopLeftBottom"}>
                        <TableList dataSource={dataSource} />
                    </div>
                    <div className={"homeBoxtopCenter"}>
                        <MapInfo task={taskMap} />
                    </div>
                    <div className={"homeBoxtopRight"}>
                        <VideoPlay />
                    </div>
                    <div className={"homeBoxtopRightBottom"}>
                        <TableList dataSource={dataSource} />
                    </div>
                    <div className={"homeBoxbottomCenterTop"}>
                        <Slider marks={marks} defaultValue={[0, 44]} handleChangeTimeSite={this.handleChangeTimeSite} sliderHandleChange={this.sliderHandleChange} />
                    </div>
                    <div className={"homeBoxbottomCenter"}>
                        <G2Component />
                    </div>
                </div>
            </ReactParticleLine>
        );
    }
}

