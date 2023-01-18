import React from 'react'
// import logo from './logo.svg';
import './App.css';
import MyForm from './MyFrom';
import StudentsList from './StudentList';
import updateService from './Service';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      studentList: [
        {
          "id": 100,
          "fullname": "Ahmed",
          "age": 47,
          "mark": 99,
          "email": "a@b.com"
        },
      ],
      activeObj: null
    }

    this.render = this.render.bind(this);
    this.editStudent = this.editStudent.bind(this)
  }

  componentWillMount() {
    // this.setState({activeObj: this.state.studentList[0]})    
    updateService('list', null, (data)=> {this.setState({studentList :data});});
  }

  editStudent( from, action, stdObj , cb) {
    const callback = typeof (cb) == 'function' ? cb : () => {};
    switch (action) {
      case "edit":
        updateService('edit', stdObj, (data) => {
          this.setState({studentList: data, activeObj: null });
        });
        callback();
        break;
      case "delete":
        updateService('delete', stdObj, (data) => {
          this.setState({studentList: data, activeObj: null });          
        })
      break;

      case "select":
        this.setState((state) =>  ({...state, activeObj: stdObj  }))
        this.forceUpdate();
      break;

      case "reset":
        this.setState((state) =>  ({...state, activeObj: null  }))
      break;

    }
    
    callback();
    console.log("I been called : list=" + this.studentList)
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <MyForm parent={this} activeObj={this.state.activeObj} />
        </div>
          <div className="col-6">
          <StudentsList parent={ this } studentList={this.state.studentList} />
          {/* <button type="button" className="btn btn-primary" style={{marginRight:"2em"}}>Save to Server</button>
          <button type="button" className="btn btn-primary">Get from Server</button> */}
          </div>
        </div>
    );
  }
}

export default App;

