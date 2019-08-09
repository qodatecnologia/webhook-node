// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// instancia body parser para suportar json
const bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//mysql para conexão com database
const mysql = require("mysql");

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

//entrada no database
app.post('/cadastrados', function(request, response) {

  var connection = mysql.createConnection({
      host     : process.env.MYSQL_HOST,
      user     : process.env.MYSQL_USER,
      password : process.env.MYSQL_PASS,
      database : process.env.MYSQL_DB  
  });
  connection.connect();
  
  // instancia intent
  var intentName = request.body.queryResult.intent.displayName;
  
  if (intentName == 'cadastro') {
    console.log('cadastrar')  
    
    var nome_ = request.body.queryResult.parameters.nome;
    var email_   = request.body.queryResult.parameters.email;
    
    var query = 'insert into cadastrados values ("'+nome_+'","'+email_+'")';
    
    connection.query(query, function (error, results, fields) {
       if (error) throw error;
       connection.end();
       response.json({"fulfillmentText" :"Ok, cadastro realizado" })
    }); 
  
    
  } 


// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
