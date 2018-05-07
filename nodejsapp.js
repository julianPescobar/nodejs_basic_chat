var express = require('express');
var hbs = require('handlebars');
var app = express();
var exphbs  = require('express-handlebars');
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({ extended: true });
app.use(urlencodedParser);

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database creada");
  db.close();
});

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine' , 'handlebars');


app.get('/', function (req, res) {
  res.render('home',{titulo:'test',footer:'copyright juliang '+ (new Date()).getFullYear()})
})
var caca = "";
var ususu = "";
app.get('/mongo', function (req, res) {
  res.render('mongo',{titulo:'TEST MONGODB',footer:'copyright juliang '+ (new Date()).getFullYear(),datos: caca, usuario: ususu})
})

  app.post("/guardar", function(req, res){
      if(req.body.user.length > 0 && req.body.texto.length > 0)
          {
        ususu = req.body.user;
      caca += '<li>'+(new Date()).toLocaleDateString()+' '+(new Date()).toLocaleTimeString()+' '+req.body.user+' dice: <p> '+req.body.texto+'</p style="background-color:gray;"></li>';
              res.writeHead(302,{'Location':'/mongo'});
  res.end();
      }
      else
          {
         res.writeHead(302,{'Location':'/mongo'});
      res.end();}
      
  });


app.listen(3000, () => console.log('Example app listening on port 3000!'))
