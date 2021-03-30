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
const cors = require('cors');
//app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/', (req, res) => {
	res.json(`${uuidV4()}`);
});

// app.get('/:room', (req, res) => {
// 	res.render('room', { roomId: req.params.room });
// });

io.on('connection', (socket) => {
	socket.on('join-room', (roomId, userId) => {
		socket.join(roomId);
		socket.to(roomId).broadcast.emit('user-connected', userId);

		socket.on('disconnect', () => {
			socket.to(roomId).broadcast.emit('user-disconnected', userId);
		});
	});
});

server.listen(port, (err) => {
	if (err) {
		console.error('Error listening on port: ' + err);
	}

	console.log('Listening on port: ' + port);
});
