const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});



const ROOM_NAME = 'my_room';
const EVENT_NAME = 'my_event';

io.on('connection', (socket) => {
  console.log('user connected:', socket.id);
  socket.emit("hello", "world");
});

io.on('connection', (socket) => {

  // Логирование подключения клиента к серверу
  console.log('user connected:', socket.id);

  // Слушаем событие с помощью констант
  socket.on(EVENT_NAME, (data) => {
    // Обработка события
    console.log(EVENT_NAME, data);
    // Отправка сообщения всем клиентам, подключенным к комнате
    io.to(ROOM_NAME).emit(EVENT_NAME, data);
  });

  // Логирование отключения клиента от сервера
  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

// Запуск сервера
server.listen(3000, () => {
  console.log('listening on *:3000');
});