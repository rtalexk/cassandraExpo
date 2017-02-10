var express = require('express');
var status = require('http-status');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({
	contactPoints: [ 'localhost' ]
});
client.connect(function ( err, res ) {
	if ( err ) {
		throw err;
	}
	console.log("Cassandra connected");
});

/* GET home page. */

router.get('/', function ( req, res ) {
	var query = "SELECT * FROM social.messages";
	client.execute(query, [], function ( err, data ) {
		if ( err ) {
			return res.status(status.INTERNAL_SERVER_ERROR).send({
				error: err.toString()
			});
		}
		data.rows = data.rows.sort(function ( a, b ) {
			return a.date > b.date ? 1 : -1;
		});
		res.render('index', {
			comments: data.rows
		});
	});
});

router.post('/', function ( req, res ) {
	try {
		var item = req.body.message;
		var id = cassandra.types.uuid();
		var date = new Date();
		var query = "INSERT INTO social.messages (id, message, date) VALUES (?, ?, ?)"
	} catch ( err ) {
		return res.status(400).json({ error: err.toString() });
	}
	console.log(item);
	client.execute(query, [ id, item, date ], function ( err, data ) {
		if (err) {
			res.status(404).send({error: err.toString()});
		} else {
			res.redirect('/');
		}
	});
});

module.exports = router;
