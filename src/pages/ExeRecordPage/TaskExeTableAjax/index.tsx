import React from "react";
import styles from "./index.less";
import { Table } from "antd";
import {Api} from '@/services/api';
import request from '@/utils/request';

const columns = [
  {
    title: "开始执行时间",
    dataIndex: "gmtStart",
    sorter: true,
    width: "20%"
  },
  {
    title: "结束执行时间",
    dataIndex: "gmtEnd",
    width: "20%"
  },
  {
    title: "执行结果",
    dataIndex: "results",
    render:paramType=>(
      <span>{paramType.displayName}</span>
    )
  }
];

class App extends React.Component {

  constructor(props) {
    super(props);
    this.setState({ data: props.exeRecordData });
  }

  state = {
    record: {},
    data: [],
    pagination: {},
    loading: false
  };

  refresh=(record)=>{
    this.setState({
      record:record
    })
    this.fetch({
      taskCode:record.code,
    });
  }
  componentDidMount() {
    // this.fetch();
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    const record={...this.state.record};
    this.setState({
      pagination: pager
    });
    this.fetch({
      size: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      taskCode:record.code,
      ...filters
    });
  };

  fetch = (params = {}) => {
    console.log("params:", params);
    this.setState({ loading: true });
    request(Api.taskExeRecord, {
      method: 'POST',
      data: params,
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = data.total;
      this.setState({
        loading: false,
        data: data.recordInfos,
        pagination
      });
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
          />
        </div>
      </div>
    );
  }
}
export default App;
