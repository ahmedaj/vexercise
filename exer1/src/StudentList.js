import React from 'react';

class StudentsList extends React.Component {
    constructor(props) {
        super(props);
    }

    showRe() {
        alert("SHOW RE CALLEDD")
    }
    render() {
        return (

            <h1 onClick={this.showRe}> HI AHMED </h1>
            
        )
    }
}

export default StudentsList;