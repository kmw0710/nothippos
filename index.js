const express = require('express');
const parser = require('body-parser');
const router = require('./routes');
const db = require('./db/config');


const app = express();

app.use(parser.json());

app.use('/scripts', express.static('./node_modules'))
app.use(express.static('./public'));

app.use('/api', router);

app.get('/', function(req, res) {
	res.redirect('/#/');
});

app.get('/login', function(res, res) {
	res.redirect('/#/login');
})

const port = 3000;

app.listen(port, function() {
  console.log(`Server running, listening on ${port}...`);	
});







