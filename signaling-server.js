const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Socket.IO 서버에 CORS 옵션 추가 (모든 도메인 허용 - 실제 운영시엔 허용할 도메인으로 변경하세요)
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', socket => {
  console.log(`클라이언트 연결됨: ${socket.id}`);
  
  socket.on('signal', data => {
    // 다른 클라이언트에게 신호 데이터 전달
    socket.broadcast.emit('signal', data);
  });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => console.log(`시그널링 서버 실행 중: 포트 ${PORT}`));
