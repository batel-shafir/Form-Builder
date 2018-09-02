const express = require('express');
const app = express();

const dataBase = {
  idx : 0 ,
  forms : [
    ]
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
  res.writeContinue
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
   res.writeContinue()
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));