const express = require('express');
const path = require('path');

const app = express();

//serve index
// app.use('/static', express.static(path.resolve(__dirname,'../static')));

app.get('/', (req, res) => {
  res.set({ 'Content-Type': 'text/html; charset=utf-8' })
  .sendFile(path.resolve(__dirname, '../index.html'));
})

//serve static from webpack build folder or on webpack dev the publicPath /build
app.use('/build', express.static(path.resolve(__dirname, '../build')));

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