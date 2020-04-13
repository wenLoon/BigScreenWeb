import React, { Component } from 'react';
import { Table } from 'antd';

export default class index extends Component {
    render() { 
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
        ];
        return (
            <div>
                <Table dataSource={this.props.dataSource} columns={columns} />
            </div>
        )
    }
}
