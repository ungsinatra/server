const socket = require('socket.io');
const http = require('http');
const cors = require('cors');

module.exports.createSocket = (http) => {
  const io = socket(http);
  io.use(cors({
    origin: '*'
  }));

  io.on('connection', function (socket) {
    console.log('Подключение!')
    socket.on('DIALOGS:JOIN', (dialogId) => {
      socket.dialogId = dialogId;
      socket.join(dialogId);
    });
    socket.on('DIALOGS:TYPING', (obj) => {
      socket.broadcast.emit('DIALOGS:TYPING', obj);
    });
  });

  return io;
};