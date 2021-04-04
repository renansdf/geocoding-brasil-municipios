import 'express-async-errors';

import express from 'express';
import cors from 'cors';
import processRouter from './process';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/process', processRouter);

app.listen(2222, () => {
  console.log('server started at port 2222');
});