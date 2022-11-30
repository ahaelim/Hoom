// Back-End

import http from "http";
import SocketIO from "socket.io";
// import WebSocket from "ws";
import express from "express";
import { SocketAddress } from "net";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// http와 ws가 같은 서버에 있길 원해서 이렇게 만든거지 필수는 아님! 걍 ws만 만들어도 됨ZZZZZZZZZZZZZZZZZZZ
const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

// const wss = new WebSocket.Server({ server });
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 5000);
  });
});

// 여기서 socket은 연결된 브라우저
function handleConnection(socket) {
  console.log(socket);
}

function onSocketClose() {
  () => console.log("Disconnected from the Browser");
}

function onSocketMessage(message) {
  console.log(message.toString("utf8"));
}

// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "Anonymous";
//   console.log("Connected to Browser");
//   //   socket.on("close", () => console.log("Disconnected from the Browser"));
//   socket.on("close", onSocketClose);
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}: ${message.payload}`)
//         );
//         break;
//       case "nickname":
//         socket["nickname"] = message.payload;
//         break;
//     }
//   });
// });

httpServer.listen(3000, handleListen);
