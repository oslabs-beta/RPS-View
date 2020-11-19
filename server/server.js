/**
 * ************************************
 *
 * @module  server
 * @author Mark, Joe
 * @date 11/18
 * @description Main entry point for backend. uses express to connect to routers which use controller middleware.
 *
 * ************************************
 */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const menuRouter = require('./routes/menuRouter');
const clientRouter = require('./routes/clientRouter');

//handle parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//serve index
// app.use('/static', express.static(path.resolve(__dirname,'../static')));

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=utf-8' })
  .sendFile(path.resolve(__dirname, '../index.html'));
})

//serve static from webpack build folder or on webpack dev the publicPath /build
app.use('/build', express.static(path.resolve(__dirname, '../build')));

app.use('/menu', menuRouter);
app.use('/client', clientRouter);


// //serve styles

//404
app.use('/', (req, res) => {
  console.log('Bad URL');
  res.sendStatus(404);
})

//listen on port 3000
app.listen(3000, () => {
  console.log('listening on port 3000')
})