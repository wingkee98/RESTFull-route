// http://localhost:portid/howToControllPath/path/path....

var express = require('express');
var app = express();
var sessions = require('express-session');
var bodyParser = require('body-parser');

///////////////////////////////////////////////////////////////////
// use session
var session;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(sessions(
	{
		secret:"jkljfiw9p2iojjba3()*&",
		resave: false,
		saveUninitialized: true
	}
));

app.get('/login', function(req, res) {
	res.sendFile('./files/index.html', {root: __dirname});
});

app.post('/login', function(req, res) {
	//res.send(JSON.stringify(req.body));

	
	session = req.session;
	if(session.uniqueID) {
		res.redirect('/redirects');
	}

	// setup a session
	if(req.body.username == 'admin' && req.body.password == 'admin') {
		//session.id = req.body.username;
		session.uniqueID = req.body.username;
	}

	res.redirect('/redirects');
});

app.get('/redirects', function(req, res) {
	session = req.session;

	//if(session.id) {
	if(session.uniqueID) {	
		res.redirect('/admin');
	}
	else {
		res.end('Who are you');
	}
});

app.get('/logout', function(req, res) {
	req.session.destroy(function(err) {
		console.log(err);
		res.redirect('/logon');
	})
});

////////////////////////////////////////////////////////////////////
app.listen(8081, function() {
	console.log('login is listening to port 8081');
});