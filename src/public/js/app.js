const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

// socket이 오픈 됐을 때 발생
socket.addEventListener("open", () => {
  console.log("Connected to Server ✔");
});

// 백에서 프론트로 보낸 메세지 받기
socket.addEventListener("message", (message) => {
  // console.log("New message: ", message.data);
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

// 서버가 오프라인 될 때
socket.addEventListener("close", () => {
  console.log("Disconnected form Server ❌");
});

// setTimeout(() => {
//   socket.send("hello from the browser!");
// }, 1000);

function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");

  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}

function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}
messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);
