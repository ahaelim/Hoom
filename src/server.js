import http from "http";
import WebSocket from "ws";
import express from "express";
// 여기서 express로는 views를 설정하고 render해주기만 함
// 나머지는 웹소켓에서 일어나게함
// app은 console.log를 실행하고 포트 3000을  listen함 localhost:3000
const app = express();

// Pug로 view engine 설정
app.set("view engine", "pug");
// Express에 template이 어디에 있는지 지정해줌
app.set("views", __dirname + "/views");
// 유저가 public으로 가게되면 __dirname + "public" 폴더를 보여주게함
// public url을 생성해서 유저에게 파일을 공유
app.use("/public", express.static(__dirname + "/public"));

// 사용할 유일한 route 생성
// home.pug를 render해주는 route handler 생성
app.get("/", (req, res) => res.render("home"));
app.get("*", (req, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

// http서버 생성 그 위에 WebSocket서버 생성
// => 나의 http 서버에 접근 하려는 것
// 필수는 아님, WebSocket만 만들어도 됨
// 우리의 서버를 만들어(보이게 노출시킴), http 서버위에 ws서버를 만들기 위함
// http를 사용한 이유 : views, static files, home, redirection 사용하려고
// => localhost는 동일한 포트에서 http, ws request 두개 다 처리 가능
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// callback으로 socket을 받음 => socket : 연결된 어떤 사람, 연결된 브라우저와의 연결 라인
// socket을 사용해 메세지 주고받기 가능 => socket을 어딘가에 저장해야함

// connection이 생기면 socket을 받음
wss.on("connection", (socket) => {
  console.log("Connected to Browser ✔");
  socket.on("close", () => console.log("Disconnected form Browser ❌"));
  socket.on("message", (message) => {
    console.log(message.toString("utf8"));
  });
  socket.send("hello!!"); // socket으로 데이터 보내기
});

server.listen(3000, handleListen);
