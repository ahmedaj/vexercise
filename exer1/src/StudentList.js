import React from 'react';

class StudentsList extends React.Component {
    constructor(props) {
        super(props);
        this.editRecord   = this.editRecord.bind(this)
        this.deleteRecord = this.deleteRecord.bind(this)
    }

    deleteRecord(stdObj) {
        this.props.parent.editStudent('list', 'delete', stdObj)
    }

    editRecord(stdObj) {
        this.props.parent.editStudent('list', 'select', stdObj)
    }

    render() {
        console.log("Render Called StdList");
        return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Age</th>
                    <th scope="col">Mark</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                { this.props.studentList.map((item) =>(
                        <tr key={item.id}>
                            <td >{item.fullname}</td>
                            <td>{item.email}</td>
                            <td>{item.age}</td>
                            <td>{item.mark}</td>
                            <td>
                                <a href="/" onClick={ (e)=> {e.preventDefault(); this.deleteRecord(item)}} style={{marginRight: "1em"}}>x</a>
                                <a href="/" onClick={ (e)=> {e.preventDefault(); this.editRecord(item)}}>e</a>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>)
    }
}

export default StudentsList;