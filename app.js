
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000, BASE_PATH } = process.env;


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
    useFindAndModify: false
});
app.use((req, res, next) => {
  req.user = {
    _id: '61213a0d6236c056c4357d04'
  };

  next();
});

app.use('/', require('./routes/user'));
app.use('/', require('./routes/card'));
app.use((req, res) => {
  res.status(404).send({ message: "По этой ссылке ничего нет" });
});

app.listen(PORT);