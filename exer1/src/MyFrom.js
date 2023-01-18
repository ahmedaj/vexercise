import React from 'react';
import  {Form, InputGroup} from 'react-bootstrap'

class MyForm extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        activeObj : this.props.activeObj? this.props.activeObj :this.newActiveObj()
      }     
      this.handleInputChange = this.handleInputChange.bind(this);
      this.reset = this.reset.bind(this);
      this.submit = this.submit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if (prevProps.activeObj != null && this.props.activeObj== null)
        this.setState({activeObj: this.newActiveObj()});
    }
    
    handleInputChange(inputState, event) {
      this.setState(prevState => {
        let newState = Object.assign({}, prevState);
        newState.activeObj[inputState] = event.target.value;
        return newState;
      });
    }


    static getDerivedStateFromProps(props, state){
      // This means a new student get selected from the list
      if (props.activeObj != null) {
        return {activeObj: props.activeObj}
      } 

    return null;
    }

    render () {
      return (
            <Form method="POST" action="store" onSubmit={this.submit.bind(this)}>

              <Form.Group className="mb-3" controlId="fullname">
                <Form.Label>Student name</Form.Label>
                <Form.Control type="text" placeholder="Full name" value={this.state.activeObj?.fullname || ""} required onChange={(e)=>this.handleInputChange('fullname', e)} />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control type="email" placeholder="" value={this.state.activeObj?.email} required onChange={(e) => this.handleInputChange('email', e)}/>
                  <Form.Control.Feedback type="invalid">Looks good!</Form.Control.Feedback>
                </InputGroup>
                
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="age">
                <Form.Label>Age</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">Years</InputGroup.Text>            
                  <Form.Control type="number" placeholder="" max="30" min="18" value={this.state.activeObj?.age} onChange={(e) => this.handleInputChange('age', e)}/>
                </InputGroup>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="mark">
                <Form.Label>Mark</Form.Label>
                <Form.Control type="number" placeholder="" min="0" max="100" value={this.state.activeObj?.mark} required onChange={(e) => this.handleInputChange('mark', e)}/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Text className="text-muted">
                  We'll never share your mark with anyone else.
                </Form.Text>
              </Form.Group>

              <input type="hidden" name="id" value={this.state.activeObj?.id} />
          
              <button type="submit" className="btn btn-primary" >Save</button>
              <button type="reset" className="btn btn-primary" onClick={this.reset}> Reset</button>
            </Form>
      );
    }

    submit(e) {
        e.preventDefault();
        this.props.parent.editStudent(
            "form",
            "edit",
            { 
                "id": Number(e.target.id.value),
                "fullname":  e.target.fullname.value,
                "email": e.target.email.value,
                "age": Number(e.target.age.value),
                "mark": Number(e.target.mark.value)
            },
            () => {this.setState({activeObj : this.newActiveObj()} )}
        );
        return false;
    }

    reset(e) {
      this.props.parent.editStudent("form", "reset")
    }

    newActiveObj() {
      return {
        id: "",
        fullname: "",
        age: "",
        mark: "",
        email: ""
      }
    }
  
  };
  
export default MyForm;