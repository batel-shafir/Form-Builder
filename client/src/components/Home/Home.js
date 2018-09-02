import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {Link} from "react-router-dom";
import './Home.css';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      redirect: false,
      forms:[],
      idx: 1
    }
  }

  /**
   * Is invoked immediately after a component is mounted. 
   * load data from the server by listening to '/api/forms' 
   */
  componentDidMount(){
    fetch('/api/forms')
      .then(res => res.json())
      .then(forms => this.setState({forms: forms}));
  }

  /**
     * Sets boolean in state to true
     */
  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  /**
     * After "redirect" boolean changed to true component redirects to FormBuilder component
     */
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/form-builder'/>
    }
  }

  render() {
    return (
      <div ><br/>
        <h2>Welcome to the Form Builder Application</h2><br/>
        <table className="homeTable">
          <thead className=''>
            <tr><th>Form Id &nbsp;&nbsp;</th><th>Name&nbsp;&nbsp;</th><th># submissions&nbsp;&nbsp;</th><th>link submit&nbsp;&nbsp;</th><th>link submissions&nbsp;&nbsp;</th></tr>
          </thead>
          <tbody>  
            {this.state.forms.map((form,key) => 
              (
              <tr key={key}> 
                <td>{form.id} </td>
                <td>{form.name}</td>
                <td>{form.number}</td>
                <td><Link to={{pathname:"/submit/"+form.id, state:form}}>Link</Link></td>
                <td><Link to={{ pathname: "/submissions/"+form.id, state: form}}>Link</Link></td>   
              </tr>
              ))
            }
          </tbody>
        </table><br/>
        {this.renderRedirect()}
        <button onClick={this.setRedirect} className="btn btn-primary">ADD A NEW FORM</button>  
      </div>
    )//return
  }//render
}//component

export default Home;
