import React from "react";
import styles from "./index.less";
import {Api} from '@/services/api';
import request from '@/utils/request';
import {Modal, Button, Form, Input, Select} from "antd";
import {FormInstance} from "antd/es/form";

class App extends React.Component {

  formRef = React.createRef<FormInstance>();

  state = {
    visible: false
    ,groupValues:[],
    formTest:null
  };
  constructor(props) {
    super(props);
  }
 componentDidMount(): void {
   this.getGroupValues()
 }

  /**
   * 获取分组值
   */
 getGroupValues=()=>{
   let that=this;
   request(Api.getGroups, {
     method: 'POST',
     data: {},
   })
     .then(function(data) {
       that.setState({
         groupValues: data.labelInfos,
       });
     })
     .catch(function(error) {
       console.log(error);
     });
 }

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
    let params = this.formRef.current!.getFieldsValue(true);
    let that=this;
    debugger
    request(Api.editTask, {
      method: 'POST',
      data: params,
    })
      .then(function(data) {
        debugger
        that.props.refreshTaskTable();
      })
      .catch(function(error) {
        console.log(error);
      });
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
      <div className={styles.container}>
        <div id="components-modal-demo-basic">
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

          <Form ref={this.formRef}
            {...(this.layout)}
            name="basic"
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="分组"
              name="groupCode"
              rules={[{ required: true, message: '请选择分组!' }]}

            >
              <Select options={this.state.groupValues}  >
              </Select>
            </Form.Item>
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
              <Select  >
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
              <Select  >
                <Option value="JSON">JSON</Option>
                <Option value="FORM">FORM</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="接口参数"
              name="param"
              rules={[{ required: false, message: '请输入接口参数!' }]}
            >
              <Input.TextArea  />
            </Form.Item>
          </Form>
        </Modal>
      </div>
        </div>
      </div>
    );
  }
}

export default App;
