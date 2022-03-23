import * as bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'
const morgan = require('morgan');

import todosRouter from '../modules/todos/router';
import * as errorHandler from '../middlewares/apiErrorHandler';

const app = express();

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// todo Router
app.use('/api/todos', todosRouter);

// Error Handler
app.use(errorHandler.notFoundErrorHandler);

app.use(errorHandler.errorHandler);

export default app;
