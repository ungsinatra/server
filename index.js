const express = require('express');
const app = express();
const server = require('http').createServer(app);
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
const Chats = require('./models/chat');
const cors = require('cors');
const auth = require('./middlewares/auth')
const UserRouter = require('./routers/userRouter');
const CompanyRoute = require('./routers/companyRoute');
// const checkUlr = require('./middlewares/doditionalUser.js');
const { } = require('./constrollers/chat')
const resumeRouter = require('./routers/remuseRouter');
const VacancyRouter = require('./routers/vacancyRouter');
const TestsRouter = require('./routers/testsRouter');
const RepliesRouter = require('./routers/repliesRouter');
const ChatsRouter = require('./routers/DialogRouter')
const userAnswerRouter = require('./routers/userAnswerRouter');
const { createUserController, login } = require('./constrollers/user');
const ChatRouter = require('./routers/ChatRouter');



const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

dotenv.config();



const DB_URL = process.env.DB_HOST;
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3001", 'http://localhost:3000'],
  methods: ['GET', 'POST', "PUT", "UPDATE", "PATCH", "DELETE"],
}));
app.use(express.json());






const chats = new Map()



io.on('connection', (socket) => {
  console.log('FIRS_CONACTION', socket.id);
  // socket.data.user = userId;
  socket.on('CHAT:JOIN', ({ chatId }) => {
    console.log('Пользователь покдлючился к чату', chatId);
    socket.join(chatId);
    socket.to(chatId).emit('CHAT:JOIN', 'Пользователь поключился')
  })

  socket.on('CHAT:LEAVE', ({ chatId }) => {
    console.log(`Пользователь из чата ${chatId} вышел`)
  })

  socket.on('CHAT:NEW_MESSAGE', async ({ chatId, message, recipientId }) => {
    console.log('Обаработка нового сообщение')
    const newChat = await Chats.handleChatMessage(chatId, message);
    socket.to(chatId).emit('CHAT:NEW_MESSAGE', { chatId, newChat })
    // FIX
    // socket.to(recipientId).emit('NOTIFICATION:NEW_MESSAGE', { message: "У вас новое сообщение!" })
  });
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

});

app.use('/api/chat', ChatRouter)
app.use('/api/users', UserRouter);
app.use('/api/dialogs', ChatsRouter)
app.use('/api/companies', CompanyRoute);
app.use('/api/resumes', resumeRouter);
app.use('/api/vacancies', VacancyRouter);
app.use('/api/tests', TestsRouter);
app.use('/api/answers', userAnswerRouter);
app.use('/api/replies', RepliesRouter);
app.post('/api/singin', login);
app.post('/api/singup', createUserController);






const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
    // .then(async () => {
    //   console.log('MongoDB connected...');
    //   const chat1 = await createChat(chatObject)
    // })
    server.listen(PORT, () => {
      console.log(`server started PORT: ${PORT}`);
    });
  } catch (e) {
    throw new Error(e);
  }
};

// app.use(auth);
startApp();

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});
