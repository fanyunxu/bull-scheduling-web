import React from "react";
import styles from "./index.less";
import { Table } from "antd";
import {Api} from '@/services/api';
import request from '@/utils/request';
const columns = [
  {
    title: "任务名称",
    dataIndex: "taskName",
    width: "30%"
  },
  // {
  //   title: "调用地址",
  //   dataIndex: "targetUrl",
  //   width:20
  // },
  {
    title: "执行周期",
    dataIndex: "cron",
    width: "70%"
  },
  // {
  //   title: "参数",
  //   dataIndex: "param",
  //   width:20
  // }
];

class App extends React.Component {

  state = {
    data: [],
    pagination: {},
    loading: false
  };
  constructor(props) {
    super(props);
  }
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
      size: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };
  rowSelection=(o)=>{
    this.props.setTaskExeData(o);
  }
  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    let that=this;
    request(Api.taskList, {
      method: 'POST',
      data: params,
    })
      .then(function(data) {
        const pagination = { ...that.state.pagination };
        pagination.total = data.total;
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
      <div className={styles.container}>
        <div id="components-table-demo-ajax">
      <Table
        columns={columns}
        rowKey={record => record.code}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
        onRow={record => {
          return {
            onClick: event => {
              this.rowSelection(record);
            }, // 点击行
            onDoubleClick: event =>{

            } ,
            onContextMenu: event => {},
            onMouseEnter: event => {}, // 鼠标移入行
            onMouseLeave: event => {},
          };
        }}
      />
        </div>
      </div>
    );
  }
}
export default App;
