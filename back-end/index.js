import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import userRouter from './routes/user.route.js';
const port = process.env.port || 3000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/auth', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});