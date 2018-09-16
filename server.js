const express = require('express');
const app = express();

const dataBase = {
  idx : 0 ,
  forms : []
  }

app.get('/api/forms', (req, res) => {
  res.json(dataBase.forms);
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/**
 * allow cors on Express.js
 */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api/form-builder', (req, res) => {
  dataBase.idx = dataBase.idx + 1; 
  var newForm= {
    id: dataBase.idx,
    name : req.body.name,
    fields :req.body.fields,
    number: 0,
    allSubmissions : []   
  }
  dataBase.forms.push(newForm); 
  res.send("ack");
});

app.post('/api/submit', (req, res) => {
  var bodyin0 = req.body[0];
  var id = bodyin0.value;
  var newSubmission = req.body.slice(1);
  var forms = dataBase.forms;
  for(var index = 0; index<forms.length;index++){
      if(forms[index].id===id){
        var currNum = forms[index].number
        forms[index].number = currNum+1;
        forms[index].allSubmissions.push(newSubmission);
        dataBase.forms[index] = forms[index];
        break;
      }
  }
  res.send("ack");
});

app.post('/api/verify', (req, res) => {
  if(
    req.body.captcha === undefined ||
    req.body.captcha === '' ||
    req.body.captcha === null
  ){
    return res.json({"success": false, "msg":"Please select captcha"})
  }

  //secret key
  const secretKey = '6LdXe3AUAAAAACGPr8gxdGgEK3bb72a3HTkYfpc_';

  //verify URL
  const verifyURL = `https://google.com/recaptcha/api/siteverify?secret = 
  ${secretKey}&response=${req.body.captcha}&remoteip=
  ${req.connection.remoteAddress}`;

  //Make request to verify url
  request(verifyURL, (err, response , body)=> {
    body = JSON.parse(body);

    //if not successful
    if(body.success!== undefined && !body.success){
      return res.json({"success": false, "msg":"Failed captcha verification"})
    }

    //if successful
    return res.json({"success": true, "msg":"captcha passed"})
  })
});


const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));