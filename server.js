const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');



const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('З\'єднання з базою даних встановлено')).catch((err) => console.log('Помилка з\'єднання з базою даних', err));




app.use('/api/orders', require('./orderRoute'));

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Сервер запущено на порту ${PORT}`);
});