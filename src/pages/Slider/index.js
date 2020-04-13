import React, { Component } from 'react';
import { Slider, Switch } from 'antd';
import "./index.scss";

export default class index extends Component {
    state = {
        active: 'day',
        stateStartValue: 0,
        stateEndValue: 0,
        intval: {},
    }
    //动态判断暂停与继续计时
    isTimesStart = (isStop = true, startV = 0, endV = 0) => {
        const { intval } = this.state;
        this.setState({
            stateStartValue: startV,
            stateEndValue: endV,
        }, () => {
            if (isStop) {
                clearInterval(intval)
            } else {
                this.tick();
            }
        })
    }

    //切换天时分
    timeSite = select => {
        switch (select) {
            case 'day':
                this.setState({ active: 'day' })
                break;
            case 'hour':
                this.setState({ active: 'hour' })
                break;
            case 'minute':
                this.setState({ active: 'minute' })
                break;
            default:
                break;
        }
        this.props.handleChangeTimeSite(select);
        this.isTimesStart(false);
    }
    //关闭计时
    sliderHandleChange = value => {
        const { intval } = this.state;
        console.log(value)
        this.props.sliderHandleChange(value, intval);
        this.setState({
            stateStartValue: value,
            stateEndValue: value
        })
    }
    //自增计时器
    tick = () => {
        let intval = setInterval(() => {
            const { stateStartValue, stateEndValue } = this.state;
            const { marks } = this.props;
            const nextNumber = stateEndValue + 1
            this.setState({
                stateEndValue: nextNumber
            }, () => {
                //判断mark结束区域，其中存在小数点情况
                for (const keyStr in marks) {
                    let key = parseInt(keyStr);
                    if (typeof key === 'number' && key % 1 === 0) {
                        if (key === parseInt(stateEndValue)) {
                            this.props.sliderHandleChange([stateStartValue, nextNumber])
                        }
                    } else {
                        if (key <= parseInt(stateEndValue) &&
                            (key + 1) >= parseInt(stateEndValue)) {
                            // console.log(parseInt(key), parseInt(stateEndValue))
                            this.props.sliderHandleChange([stateStartValue, nextNumber])
                        }
                    }
                }

            })
            this.setState({ intval })
        }, 1000);
    }
    //控制开始暂停
    onChangeSwitch = (checked) => {
        const { stateStartValue, stateEndValue } = this.state;
        if (checked) {
            this.isTimesStart(true, stateStartValue, stateEndValue);
        } else {
            this.isTimesStart(false, stateStartValue, stateEndValue);
        }
    }
    componentDidMount() {
        this.tick();
    }
    render() {
        const { marks, defaultValue } = this.props;
        const { stateStartValue, stateEndValue } = this.state;
        const { timeSite } = this;
        const { active } = this.state;

        return (
            <div className={"sliden-component"}>
                <div className='tips'>
                    <div className='words'>
                        <div className='time'>
                            <div className={active === "day" ? 'active' : ''} onClick={timeSite.bind(this, 'day')}>天</div>
                            <div className={active === "hour" ? 'active' : ''} onClick={timeSite.bind(this, 'hour')}>时</div>
                            <div className={active === "minute" ? 'active' : ''} onClick={timeSite.bind(this, 'minute')}>分</div>
                        </div>
                    </div>
                </div>
                <div className='sid'>
                    <Switch defaultChecked={false} onChange={this.onChangeSwitch} />
                    <Slider marks={marks} value={stateEndValue} onChange={this.sliderHandleChange} defaultValue={stateEndValue} />
                </div>
            </div>
        );
    }
}