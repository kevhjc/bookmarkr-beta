const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

const Bookmark = require('./models/bookmarkModel');
const bookmarkController = require('./controllers/bookmarkController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/read', (req, res) => {
  Bookmark.find({}, (err, result) => {
    if (err) {
      res.send(
        'Error in bookmarkController.getAllBookmarks: ' + JSON.stringify(err)
      );
    }
    res.send(result);
  });
});

app.post('/add', bookmarkController.addBookmark, (req, res) => {
  return res.status(200).redirect('/');
});

app.get('/', (req, res) => {
  return res
    .status(200)
    .sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  Bookmark.findByIdAndRemove(id, (err, result) => {
    if (err) {
      res.send(err);
    }
    return res.status(200).redirect('/');
  });
});

app.delete('/deleteAll/', (req, res) => {
  Bookmark.deleteMany({}, (err, result) => {
    if (err) {
      res.send(err);
    }
    return res.status(200).send('Successfully deleted all bookmarks');
  });
});

app.get((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
