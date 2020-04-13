import React, { Component, memo, useState, useEffect } from 'react';
import { moment } from '../../component/util/util';
import { DatePicker, Select, Button } from 'antd';
import styles from './index.scss';

const FORMAT = 'YYYY/MM/DD HH:mm:SS';
const { Option } = Select;

export default class index extends Component {
  state = {
    currentTime: '',
  }

  componentDidMount() {
    setInterval(() => {
      const time = moment().format(FORMAT);
      this.setState({ currentTime: time })
    }, 1000);
  }
  render() {
    function handleChange(value) {
      console.log(`selected ${value}`);
    }
    return (
      <div className={"header"}>
        <div className='left'>
          <span>演练数据回放</span>
        </div>
        <div className="mid">
          <div className='midleft'>
            <div>
              演练名称:
              <Select defaultValue="1" style={{ width: 120 }} onChange={handleChange}>
                <Option value="1">空剑2020</Option>
                <Option value="2">空剑2019</Option>
                <Option value="3">空剑2018</Option>
              </Select>
              开始时间:<DatePicker />
              结束时间:<DatePicker />
            </div>
            <span>
              演练套数:
              <Select defaultValue="1" style={{ width: 120 }} onChange={handleChange}>
                <Option value="1">一套</Option>
                <Option value="2">两套</Option>
                <Option value="3">三套</Option>
              </Select>
              演练阶段:
              <Select defaultValue="1" style={{ width: 120 }} onChange={handleChange}>
                <Option value="1">作战计划</Option>
                <Option value="2">指挥对抗</Option>
              </Select>
              参演指挥所及要素:
              <Select defaultValue="1" style={{ width: 120 }} onChange={handleChange}>
                <Option value="1">选择全部</Option>
                <Option value="2">总导演部</Option>
                <Option value="3">红军导演部</Option>
              </Select>
            </span>
          </div>
          <div className='midright'>
            <Button type="primary">开始回放</Button>
          </div>
        </div>
        <div className="right">
          <div className='time'>
            当前时间：
            <div>{this.state.currentTime}</div>
          </div>
        </div>
      </div >
    )
  }
}
