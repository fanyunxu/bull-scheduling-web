import styles from "./index.less";
import React, { useState } from "react";
import {Table, Radio, Divider, Space} from "antd";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
  },
  {
    title: '操作',
    dataIndex: 'operation',
    render: (_, record: { key: React.Key }) =>
      // this.state.dataSource.length >= 1 ? (
      //   <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
      //     <a>Delete</a>
      //   </Popconfirm>
      // ) :
      ( <Space size="middle">
        <a>编辑</a>
        <a>删除</a>
      </Space>)
  }
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Disabled User",
    age: 99,
    address: "Sidney No. 1 Lake Park",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

const Demo = () => {
  const [selectionType, setSelectionType] = useState("checkbox");

  return (
    <div>

      <Divider />

      <Table
        rowSelection={{
          type: "Checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default () => (
  <div className={styles.container}>
    <div id="components-table-demo-row-selection">
      <Demo />
    </div>
  </div>
);
