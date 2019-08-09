// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// instancia body parser para suportar json
const bodyParser = require('body-parser');
app.use(bodyParser.json());       
app.use(bodyParser.urlencoded({   
  extended: true
}));

//mysql para conexão com database
const mysql = require("mysql");

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

//entrada no database
app.post('/cadastrados', function(request, response) {

  var connection = mysql.createConnection({
      host     : process.env.HOST,
      user     : process.env.USER,
      password : process.env.PASS,
      database : process.env.DB  
  });
  connection.connect();
  
var intentName = request.body.queryResult.intent.displayName;

 if (intentName == 'cadastro') {
    var nome_ = request.body.queryResult.parameters.nome;
    var email_   = request.body.queryResult.parameters.email;
    var query = 'insert into cadastrados values ("'+nome_+'","'+email_+'")';
 };
// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
 console.log(listener.address().port);
});
});    
