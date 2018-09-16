import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { ReCaptcha } from 'react-recaptcha-google'
import './Submit.css';


/**
 * Submit component - form is presented and is being submitted.
 */
class Submit extends Component {
    constructor(props, context){
        super(props,context);
        this.onLoadRecaptcha = this.onLoadRecaptcha.bind(this);
        this.verifyCallback = this.verifyCallback.bind(this);
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

    componentDidMount() {
        if (this.captchaDemo) {
            console.log("started, just a second...")
            this.captchaDemo.reset();
        }
      }
      onLoadRecaptcha() {
          if (this.captchaDemo) {
              this.captchaDemo.reset();
          }
      }
      verifyCallback(recaptchaToken) {
        // Here you will get the final recaptchaToken!!!  
        console.log(recaptchaToken, "<= your recaptcha token")
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
        http.open('POST', url, false);
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
        var jsonObject = JSON.stringify(data);   
        http.send(jsonObject);
        //alert("Submitted Successfully! Click 'Back'");
        this.setRedirect();      
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
            <html>
                <head>
                    <br/><br/>
                    <h1>{this.state.formName}</h1>
        
                </head>
                <body> 
                    <form><br/>
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
                    <ReCaptcha
            ref={(el) => {this.captchaDemo = el;}}
            size="normal"
            data-theme="dark"            
            render="explicit"
            sitekey="6LdXe3AUAAAAAMobGT_-EGPzVfdTYEL4fApIalhM"
            onloadCallback={this.onLoadRecaptcha}
            verifyCallback={this.verifyCallback}
        />
                    <div>{this.renderRedirect()}
                        <button onClick={this.handleSubmit} className="save-btn">Submit</button>  
                    </div>
                    <div> {this.renderRedirect()}
                        <button type="button"  onClick ={this.setRedirect} className="save-btn">Back</button>
                    </div>
            </body>
            </html>
        );//return
    }//render
}//component


export default Submit;
