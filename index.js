const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const UserRouter = require('./routers/userRouter');
const CompanyRoute = require('./routers/companyRoute');
// const checkUlr = require('./middlewares/doditionalUser.js');
const resumeRouter = require('./routers/remuseRouter');
const VacancyRouter = require('./routers/vacancyRouter');
// const auth = require('./middlewares/auth');
const TestsRouter = require('./routers/testsRouter');
const userAnswerRouter = require('./routers/userAnswerRouter');
const { createUserController, login } = require('./constrollers/user');

dotenv.config();

const DB_URL = process.env.DB_HOST;
const PORT = process.env.PORT || 4000;
const app = express();
// app.use(cors({
//   origin: process.env.ALLOWED_ORIGINS,
// }));

app.use(express.json());
app.use('/api/users', UserRouter);
// app.use(auth)
app.use('/api/companies', CompanyRoute);
app.use('/api/resumes', resumeRouter);
app.use('/api/vacancies', VacancyRouter);
app.use('/api/tests', TestsRouter);
app.use('/api/answers', userAnswerRouter);

app.post('/api/signin', login);
app.post('/api/signup', createUserController);
const startApp = async () => {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    app.listen(PORT, () => {
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
