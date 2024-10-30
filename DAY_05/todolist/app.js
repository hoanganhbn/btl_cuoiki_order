const express = require('express');
const bodyParser = require('body-parser');
const todosRouter = require('./src/routers/todos');

const app = express();
app.use(bodyParser.json());

app.use('/todos', todosRouter);

module.exports = app;
