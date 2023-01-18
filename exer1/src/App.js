import React from 'react'
// import logo from './logo.svg';
import './App.css';
import MyForm from './MyFrom';
import StudentsList from './StudentList';
import updateServer from './Service';

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

    // this.render = this.render.bind(this);
    // this.editStudent = this.editStudent.bind(this)
  }

  componentWillMount() {
    // this.setState({activeObj: this.state.studentList[0]})    
  }

  editStudent( from, action, stdObj , cb) {
    const callback = typeof (cb) == 'function' ? cb : () => {};
    switch (action) {
      case "add":
        updateServer('create', stdObj);
        let stdlst = this.state.studentList;
        stdlst.push(stdObj);
        this.setState({studentList: stdlst, activeObj: null })

        callback();
        break;
      case "delete":
        let idx = this.state.studentList.findIndex( obj => obj.id === stdObj.id)
        this.state.studentList.splice(idx,1);
        this.setState({studentList: this.state.studentList})
        break;

      case "select":
        console.log("CHANGE ACTIVE ID!");
        this.setState((state) =>  ({...state, activeObj: stdObj  }))
        console.log("AFTER SET STATTTTTEEEEEEE")
        break;
      default:
        this.setState({activeObj: null});
    }
    
    this.forceUpdate();
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

