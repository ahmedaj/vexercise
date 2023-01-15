import React, { useState } from 'react'
import logo from './logo.svg';
import './App.css';
import MyForm from './MyFrom';
import StudentsList from './StudentList';





class App extends React.Component {

  studentList = [];
  constructor(props) {
    super(props)
    this.editStudent.bind(this);
  }

  editStudent( from, action, std ) {
    switch (action) {
      case "add": 
        console.log("I Will push!!!")
        this.studentList.push(std);
        break;
      case "delete":
        let idx = this.studentList.findIndex( obj => obj.id === std.id)
        this.studentList.splice(idx,1);
        break;
    }
    
    if (from === 'form') {
      StudentsList.showRe()
    }
    console.log("I been called : list=" + this.studentList)
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <MyForm parent={ this }/>
        </div>
          <div className="col-6">
          <StudentsList parent={this}/>
          </div>
        </div>
    );
  }
}

export default App;

