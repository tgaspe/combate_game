const io = require("socket.io")(2000, {
    cors: {
        origin: ["http://localhost:3000"]
    }
})

const SOCKET_LIST = {};
const ROOMS = {};

io.on("connection", socket => {
    
	SOCKET_LIST[socket.id] = socket;
    
    // Creating Room
    socket.on("createRoom", () => {
        const roomId = makeid(8);
        socket.join(roomId);
        ROOMS[roomId] = [socket.id];
        socket.emit("newGame", {room: roomId});
    });

    // Join Room
    socket.on("joinRoom", (data) => {
        console.log("join room received!");
        if (ROOMS[data.room] != null) {
            socket.join(data.room);
            ROOMS[data.room].push(socket.id);
            io.in(data.room).emit("playersConnected", {room: data.room});
        } else {
            socket.emit("error-joining", {room: data.room});
            console.log("room does not exits");
        }
    });

    // Piece Deployment
    socket.on("deployment-phase", (data) => {
        // Socket Ids from that room
        let p1 = ROOMS[data][0];
        let p2 = ROOMS[data][1];

        // Sending back who is player1 and 2 back to clients
        SOCKET_LIST[p1].emit('setPlayers', {player1: true, room: data});
        SOCKET_LIST[p2].emit('setPlayers', {player1: false, room: data});

        console.log("deployment info sent");
    });

    // Game Start
    socket.on("start", (data) => {
        io.in(data.room).emit('gameStart', data);
        console.log("Game Starting...");
    });

    // End turn 
    socket.on("endTurn", (data) => {
        // Socket Ids from that room
        let p1 = ROOMS[data.roomId][0];
        let p2 = ROOMS[data.roomId][1];

        console.log("End turn received from player1? " + data.player1);

        if (data.player1) {
            SOCKET_LIST[p2].emit('newTurn', {});
            console.log("new turn sent to player1 ...");
        } else {
            SOCKET_LIST[p1].emit('newTurn', {});
            console.log("new turn sent to player2 ...");
        }
    });

    //Sending msg
    socket.on('sendMsgToServer', (data) => {
        console.log("msg received from client");
        let playerName;
        if (data.player1) {
            playerName = "Red : ";
        } else if (data.player1 === false) {
            playerName = "Blue: ";
        } else {console.log(data.player1 + " is undefined")}

		io.in(data.room).emit('addToChat',playerName + data.msg);
        console.log("msg emited back to clients");
	});

    //Updating Movement
    socket.on("movingPiece", (data) => {
        console.log("moving piece");
        // Socket Ids from that room
        let p1 = ROOMS[data.roomId][0];
        let p2 = ROOMS[data.roomId][1];

        if (data.player1) {
            SOCKET_LIST[p2].emit('updateBoard', data);
            console.log("sending back update on board to player2 ...");
        } else {
            SOCKET_LIST[p1].emit('updateBoard', data);
            console.log("sending back update on board to player1 ...");
        }
    });

    //Updating Attack
    socket.on("attack", (data) => {
        console.log("attack command:");
        // Socket Ids from that room
        let p1 = ROOMS[data.roomId][0];
        let p2 = ROOMS[data.roomId][1];

        if (data.player1) {
            SOCKET_LIST[p2].emit('updateAttack', data);
            console.log("sending back Attack update to player2 ...");
        } else {
            SOCKET_LIST[p1].emit('updateAttack', data);
            console.log("sending back Attack update to player1 ...");
        }

    });

    //GAME OVER
    socket.on("GAME-OVER", (data) => {
        console.log("game over signal received");
        io.in(data.roomId).emit('End-Screen', {winner: data.player1});
	});

    //ON DISCONECT
    socket.on('disconnect',function () {
		delete SOCKET_LIST[socket.id];
	});
})

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}