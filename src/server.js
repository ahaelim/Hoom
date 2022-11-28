import express from "express";
// 여기서 express로는 views를 설정하고 render해주기만 함
// 나머지는 웹소켓에서 일어나게함
// app은 console.log를 실행하고 포트 3000을  listen함 localhost:3000
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/src/views");

// 사용할 유일한 route 생성
app.get("/", (req, res) => res.render("home"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
