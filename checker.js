var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7181);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  var gParams = [];
  for (var g in req.query){
    gParams.push({'name':g,'value':req.query[g]})
  }
  var gContext = {};
  gContext.entries = gParams;
  res.render('get', gContext);
});

app.post('/', function (req, res) {
  var pParams = [];
  for (var p in req.query){
    pParams.push({'name':p,'value':req.query[p]})
  }
  var pContext = {};
  pContext.entries = pParams;
  res.render('post', pContext);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
