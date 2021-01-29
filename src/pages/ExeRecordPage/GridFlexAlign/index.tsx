import React from "react";
import styles from "./index.less";
import TaskListAjax from '../TaskListAjax';
import TaskExeTableAjax from '../TaskExeTableAjax';
import {Row, Col, Divider, Table} from "antd";


class App extends React.Component {

  state = {
    taskExeRecordData: {},
    pagination: {},
    loading: false
  };
  setTaskExeData=(data)=>{
    this.setState({
      taskExeRecordData:data
    });
    this.child.refresh(data);
  }
  componentDidMount() {

  }
  onRef = (ref) => {
    this.child = ref
  }

  render() {
    return (
        <div>
          <Row justify="space-around">
            <Col span={8}><TaskListAjax setTaskExeData={this.setTaskExeData} />
            </Col>
            <Col span={14}> <TaskExeTableAjax ref={this.onRef} /></Col>
          </Row>
        </div>
    );
  }
}
export default () => (
  <div className={styles.container}>
    <div id="components-grid-demo-flex">
      <App/>
    </div>
  </div>
);
