import React from "react";
import styles from "./index.less";
import {Modal, Button, Form, Input, Select} from "antd";

class App extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };
   tailLayout = {
    wrapperCol: {
      offset: 0,
      span: 24,
    },
  };
   layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 19,
    },
  };
  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
   onFinish = (values) => {
    console.log('Success:', values);
  };

   onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          新增
        </Button>
        <Modal
          title="新增任务"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form
            {...(this.layout)}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="任务名称"
              name="taskName"
              rules={[{ required: true, message: '请输入任务名称!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="调用地址"
              name="targetUrl"
              rules={[{ required: true, message: '请输入调用地址!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="方法"
              name="method"
              rules={[{ required: true, message: '请选择方法!' }]}
            >
              <Select  defaultValue={"POST"}>
                <Option value="POST">POST</Option>
                <Option value="GET">GET</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="调度周期"
              name="cron"
              rules={[{ required: true, message: '请输入调度周期!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="参数类型"
              name="paramType"
              rules={[{ required: true, message: '请选择参数类型!' }]}
            >
              <Select  defaultValue={"JSON"}>
                <Option value="JSON">JSON</Option>
                <Option value="FORM">FORM</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="接口参数"
              name="param"
              rules={[{ required: true, message: '请输入接口参数!' }]}
            >
              <Input.TextArea  />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default () => (
  <div className={styles.container}>
    <div id="components-modal-demo-basic">
      <App />
    </div>
  </div>
);
