const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');


const dbURL = process.env.MONGODB_URI;
const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Помилка з\'єднання з базою даних:'));
db.once('open', () => {
  console.log('З\'єднання з базою даних встановлено');
});


app.use('/api/orders', require('./orderRoute'));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});