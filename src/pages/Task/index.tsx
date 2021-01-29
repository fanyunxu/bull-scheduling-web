import { PageContainer } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import TaskListTable from './TaskListTable';
import AddTaskModalBasic from './AddTaskModalBasic';

class App extends React.Component {

state={
  loading: false
}
refreshTaskTable=()=>{
  this.child.fetch();
}
onRef=(ref)=>{
  this.child = ref;
}
render() {
  return (
    <PageContainer  className={styles.main}>
      <AddTaskModalBasic  refreshTaskTable={this.refreshTaskTable}/>
      <TaskListTable ref={this.onRef}/>
      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={this.state.loading} size="large" />
      </div>
    </PageContainer>
  );
  }
  }
export default App;
