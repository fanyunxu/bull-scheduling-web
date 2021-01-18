import styles from "./index.less";
import React, { useState } from "react";
import {Table, Radio, Divider, Space} from "antd";
import request from '@/utils/request';
const columns = [
  {
    title: "任务名称",
    dataIndex: "taskName",
  },
  {
    title: "调用地址",
    dataIndex: "targetUrl",
  },
  {
    title: "调用方法",
    dataIndex: "method",
  },
  {
    title: "执行周期",
    dataIndex: "cron",
  },
  {
    title: "参数类型",
    dataIndex: "paramType",
    render:paramType=>(
     <span>{paramType.displayName}</span>
    )
  },
  {
    title: "参数",
    dataIndex: "param",
  },
  {
    title: "状态",
    dataIndex: "status",
    render:paramType=>(
      <span>{paramType.displayName}</span>
    )
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: (_, record: { key: React.Key }) =>
      ( <Space size="middle">
        <a>编辑</a>
        {record.status.name=='USING'?<a>暂停</a>:<a>恢复</a>}
        <a>删除</a>
      </Space>)
  }
];
class App extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    let that=this;
    request()
      .post("http://127.0.0.1:8096/task/list", {
        data:params
      })
      .then(function(data) {
        const pagination = { ...that.state.pagination };
        pagination.total = data.total;
        console.log( data.taskInfos)
        that.setState({
          loading: false,
          data: data.taskInfos,
          pagination
        });

      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Table
        columns={columns}
        rowKey={record => record.code}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-row-selection">
      <App />
    </div>
  </div>
);
