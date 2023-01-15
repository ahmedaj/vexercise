import React from 'react';
import  {Form, InputGroup} from 'react-bootstrap'

class MyForm extends React.Component {

    // const [user, setUser] = useState({username: ''})
    // const {username} = user;
    constructor(props) {
      super(props)
      this.state = {
        username :""
      }

      this.submit = this.submit.bind(this);
    //   this.onEmailChange = this.onEmailChange.bind(this);
    }
  
    render () {
      return (

            <Form method="POST" action="store" onSubmit={this.submit}>
              <Form.Group className="mb-3" controlId="fullname">
                <Form.Label>Student name</Form.Label>
                <Form.Control type="text" placeholder="Full name" required/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  <Form.Control type="email" placeholder="" required/>
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
                  <Form.Control type="number" placeholder="" max="30" min="18"/>
                </InputGroup>
              </Form.Group>
  
              <Form.Group className="mb-3" controlId="mark">
                <Form.Label>Mark</Form.Label>
                <Form.Control type="number" placeholder="" min="0" max="100" required/>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Text className="text-muted">
                  We'll never share your mark with anyone else.
                </Form.Text>
              </Form.Group>
          
              <button type="submit" className="btn btn-primary" >Submit</button>
            </Form>
      );
    }

    submit(e) {
        e.preventDefault();        
        this.props.parent.editStudent("form", "add",{ "obname": "THJE OBJECTSS"});
        return false;
    }
  
  };
  
export default MyForm;