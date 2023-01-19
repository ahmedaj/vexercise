import React from 'react';
import  {Button, Collapse, Accordion} from 'react-bootstrap'

class Intro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {iOpen:false}
  };

  render (){

    return (
      <div>
      <Button
        onClick={() => {this.setState({isOpen: !this.state.isOpen})}}
        aria-controls="collapse-acc"
        aria-expanded={this.state.isOpen}
      >
      Details
      </Button>
      <Collapse in={this.state.isOpen}>
      <Accordion defaultActiveKey="3" id="collapse-acc">
        <Accordion.Item eventKey="3">
          <Accordion.Header>Intro</Accordion.Header>
            <Accordion.Body>
              <h6>This exercise built by Ahmed Jaradat for the application to Vytalize Health job</h6>
            </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Backend</Accordion.Header>
          <Accordion.Body>
            <h6>Backend built using Golang gin framework used for backend</h6>
            <div>No database used, data stored to local json file</div>
            <div>Run : <code>go run .</code></div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
        <Accordion.Header>FrontEnd</Accordion.Header>
          <Accordion.Body>
            <h6>Frontend built using React JS</h6>
            <div>it is better to rewrite it in TS</div>
            <div>to run the dev server: 
              <code>npm install</code>
              <code>npm start</code>

              and as any node app you can build it using
              <code>npm run build</code>
            </div>
          </Accordion.Body>
        </Accordion.Item> 
        <Accordion.Item eventKey="2">
          <Accordion.Header>Details</Accordion.Header>
          <Accordion.Body>
          The generated react `build` folder referenced by the Golang backend so rebuild the frontend and everything
                should works fine
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      </Collapse>

    </div>
    )
  }

}

export default Intro;