import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './Submissions.css';

class Submissions extends Component {
  constructor(){
    super();
    this.state = {
      boolean:true,
      redirect: false,
      formName:'',
      fields:[],
      allSubmissions : []   
    }
  }

  /**
       * is invoked immediately after updating occurs. 
       * This method is not called for the initial render.
       * triggers setState.
       */
  componentDidUpdate(data) {
    if (this.state.boolean) {
      this.setState({
          boolean: false,
          formName:data.name,
          fields: data.fields,
          allSubmissions: data.allSubmissions
    })}
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
    * After "redirect" boolean changed to true component redirects to home component
    */   
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={{pathname:'/'}}/>
    }
  }

  render() {
    const data = this.props.location.state; 
    this.componentDidUpdate(data);
    return (
      <div ><br/><br/>
        <h3>{this.state.formName} submissions</h3><br/>
          <table className="submissionsTable">
            <thead className=''>
              <tr>
                  {this.state.fields.map((field,key)=> 
                    {
                      return(
                        <th key={key}>{field.name}</th>
                      )
                    }
                  )}
              </tr>
            </thead>
            <tbody>  
              {this.state.allSubmissions.map((submission,key) => {
                return(
                    <tr key = {key}>{submission.map((field,key) =>
                      <td key={key}>{field.value}</td>
                    )}</tr>
                  )
                })
              }
           </tbody>
          </table><br/>
          {this.renderRedirect()}
          <button onClick={this.setRedirect} className="btn btn-primary">Back</button>  
      </div>
    );//return
  }//render
}//component

export default Submissions;
