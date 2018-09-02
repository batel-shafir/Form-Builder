import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './Submit.css';

/**
 * Submit component - form is presented and is being submitted.
 */
class Submit extends Component {
    constructor(){
        super();
        this.state = {
        formId : '', //id
        formName : '' , //name
        formFields: [], //fields
        formNumber: 0, //#submissions
        formAllSubmissions: [], //array of allSubmissions
        redirect: false,
        boolean: true      
        }
        this.handleInputChange = this.handleInputChange.bind(this);
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
                formName: data.name,
                formFields: data.fields,
                formId: data.id,
                formAllSubmissions: data.allSubmissions
            })
        }
    }

    /**
   * This function allows change of inputs by name
   */
    handleInputChange=(event)=>{
        var name = event.target.name;
        var value = event.target.value;
        var fieldsArray = this.state.formFields; 

        for(let index = 0; index < fieldsArray.length; index++) {
            if(fieldsArray[index].name === name){
                fieldsArray[index].input = value;
            }
        }
        this.setState({
            formFields : fieldsArray
        })
    }

    /**
   * This function handles Submit event.
   * creates a newSubmission object and sends it to updateServer.
   */
    handleSubmit = () => {
        var newSubmission = [{key: "id" ,value:this.state.formId}];
        var fieldsArray = this.state.formFields; 
        for(let index = 0; index < fieldsArray.length; index++){
            newSubmission.push({
                key: fieldsArray[index].name,
                value: fieldsArray[index].input
            });  
        }
        this.updateServer(newSubmission);         
    }

    /**
    * In this function the new form that was created is sent to the server.
    */
    updateServer(data) { 
        var http = new XMLHttpRequest(); 
        var url = 'http://localhost:5000/api/submit';
        http.open('POST', url, true);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
        var jsonObject = JSON.stringify(data);   
        http.send(jsonObject);
        alert("Submitted Successfully! Click 'Back'");      
    }

     /**
   * After "redirect" boolean changed to true component redirects to home component
   */
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{pathname:'/'}}/>
        }
    }

    /**
   * Sets boolean in state to true
   */
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    render() {    
        const data = this.props.location.state;  ///form
        this.componentDidUpdate(data);
        return (
            <div ><br/><br/>
                <h3>{this.state.formName}</h3>
                <form>
                    {this.state.formFields.map((field,key) => (
                        <label key={key} name ={field.label}>
                        {field.name}&nbsp;&nbsp;&nbsp;&nbsp;
                            <input 
                                name={field.name}  
                                value={field.input}                   
                                onChange={this.handleInputChange}
                                type={field.type}
                            /> <br/><br/>
                        </label> 
                    ))}
                </form><br/>
                <div>
                    <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>  
                </div>
                <div> {this.renderRedirect()}
                    <button type="button"  onClick ={this.setRedirect} className="save-btn">Back</button>
                </div>
            </div>
        );//return
    }//render
}//component


export default Submit;
