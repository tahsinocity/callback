const express = require('express');
//const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
	},
});
const { v4: uuidV4 } = require('uuid');
const port = process.env.PORT || 8080;

//app.use(express.static(path.join(__dirname, 'build')));
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	next();
});

app.get('/', function (req, res) {
	//res.sendFile(path.join(__dirname, 'build', 'index.html'));
	res.send('I am alive...');
});

let interval;

io.on('connection', (socket) => {
	console.log('New client connected');
	if (interval) {
		clearInterval(interval);
	}
	interval = setInterval(() => getApiAndEmit(socket), 1000);
	socket.on('disconnect', () => {
		console.log('Client disconnected');
		clearInterval(interval);
	});
});

const getApiAndEmit = (socket) => {
	const response = new Date();
	socket.emit('FromAPI', response);
};

server.listen(port, (err) => {
	if (err) {
		console.error('Error listening on port: ' + err);
	}

	console.log('Listening on port: ' + port);
});
