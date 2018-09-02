import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import './FormBuilder.css';


class FormBuilder extends Component {
  constructor(){
    super();
    this.state = {
      leastOne : false,
      label:'',
      name: '',
      type: 'text',
      formName: 'Write Your Form Name Here',
      redirect: false,
      fields:[]
    }

    this.handleAddField = this.handleAddField.bind(this);
    this.handleSave = this.handleSave.bind(this);
  
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

  /**
   * This function handles AddField event, adds the new field to Array of fields in state.
   */
  handleAddField = () => { 
    if(this.state.label === '' && this.state.name === ''){//not all required inputs are filled
    alert("Please fill all fields")
    }
    else{//if all filled add the field to the field Array
    this.setState({
      leastOne : true,
      fields: this.state.fields.concat([{ label: this.state.label, name: this.state.name, type:this.state.type, input:'' }])   
    })
    //clean inputs for a new "add field" 
    this.setState({
      label: '',
      name : '',
      type: 'text',
    })
  };
  }

  /**
   * In this function the new form that was created is sent to the server.
   */
  updateServer(data) { 
    var http = new XMLHttpRequest(); 
    var url = 'http://localhost:5000/api/form-builder';
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
    var jsonObject = JSON.stringify(data);
  
    http.send(jsonObject);
    alert("Form Added Successfully!"); 
  }

  /**
   * This function allows change of inputs.
   */
  handleOnChange = (event) => {
    var temp = event.target.name;
    if(temp ==="label")
      this.setState({label:event.target.value});
    if(temp ==="name")
      this.setState({name:event.target.value});
    if(temp ==="type")
      this.setState({type:event.target.value});
  }

  /**
   * This function handles "save" event - sends new form to UpdateServer.
   */
  handleSave = () => {
    if(this.state.leastOne === false){
      alert("Please add at least one field to your form")
    }
    else{
      var form = {
        name : this.state.formName ,
        fields : this.state.fields ,
        numOfSubmissions : 0 
      };
      this.updateServer(form);
  }}
  render() {
    return(
      <div>
        <h3>{this.state.formName}</h3>
        <form>
          {this.state.fields.map((field,key) => 
            (
              <label key = {key}>{field.label}&nbsp;&nbsp;&nbsp;&nbsp;
                <input id = {field.id} readOnly type={field.type}/><br/><br/>
              </label>              
            ))
          }
        </form><br/><br/><br/>
        <div className="field">
          <label>label&nbsp;&nbsp;&nbsp;</label>
          <input
            name = "label"
            type="text"
            placeholder={`field label`}
            value={this.state.label}
            onChange =  {this.handleOnChange}/><br/><br/>
          <label>Input Name&nbsp;&nbsp;&nbsp;</label>
          <input
            name = "name"
            type="text"
            placeholder={`input name`}
            value={this.state.name}
            onChange =  {this.handleOnChange}/><br/><br/>
          <label>
            Select Input Type:&nbsp;&nbsp;&nbsp;
            <select name = "type" value={this.state.type} onChange={this.handleOnChange}>
              <option value="text"> text </option>
              <option value="color"> color </option>
              <option value="date"> date </option>
              <option value="email"> email </option>
              <option value="tel"> tel </option>
              <option value="number">number</option>
            </select>
          </label>
          </div><br/><br/>
            <button type="button" onClick={this.handleAddField} className="add-btn">Add Field</button><br/><br/>           
            <h5>When finished insert form name and click Save</h5>
            <label>
              Insert Form Name:&nbsp;&nbsp;&nbsp;
                <input
                  type="text"
                  placeholder={`Form Name`}
                  value={this.state.formName}
                  onChange =  {(e)=>this.setState({formName:e.target.value})}
                />
            </label><br/><br/> 
            <div>
              {this.renderRedirect()}
              <button type="button"  onClick ={this.setRedirect} className="save-btn">Back</button>
              <button type="button"  onClick ={this.handleSave} className="save-btn">Save Form</button>     
            </div>
      </div>            
    )//return
  }//render
}//component

export default FormBuilder;
