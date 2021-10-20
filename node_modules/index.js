let express = require("express");
let app = express();
let httpServer = require("http").createServer(app);
let io = require("socket.io")(httpServer);

let connections = [];

io.on("connect", (socket) => {
    connections.push(socket);
    console.log(`${socket.id} has connected`);

    socket.on("propogate", (data) => {
        connections.map((con) => {
            if(con.id !== socket.id) {
                con.emit("onpropogate", data);
            }
        });
    });
    
})