const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

//app
const app = express();

const database = config.get('db')

//db
mongoose.connect(database)
  .then(() => console.log('You are now connected to MongoDB!'))
  .catch(err => console.error('Something went wrong.', err))

//JSON body parser
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Welcome to Book Trekker.')
});

const port = config.get('server.port') || 3000;

app.listen(port, () => {
  console.log(`Server is listening on ${ port }`);
})