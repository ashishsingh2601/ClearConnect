const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const ioConnection = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
	response.send('Running!!!');
});

ioConnection.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		ioConnection.to(userToCall).emit("callUser", { signal: signalData, from, name });
	})

	socket.on("answerCall", (data) => {
		ioConnection.to(data.to).emit("callAccepted", data.signal);
	})
})

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
