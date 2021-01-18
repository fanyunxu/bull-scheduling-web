import React from "react";
import styles from "./index.less";
import TaskListAjax from '../TaskListAjax';
import TaskExeTableAjax from '../TaskExeTableAjax';
import { Row, Col, Divider } from "antd";
import {PageContainer} from "@ant-design/pro-layout";

export default () => (
  <div className={styles.container}>
    <div id="components-grid-demo-flex">
      <>
        <Row justify="space-around">
          <Col span={8}><TaskListAjax />
           </Col>
          <Col span={14}> <TaskExeTableAjax /></Col>
        </Row>
      </>
    </div>
  </div>
);
