const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Order = require('./models/order');

function isValidEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!email.includes('@')) {
    return false;
  }

  const parts = email.split('@');

  if (parts.length === 2 && parts[1].includes('.')) {
    return emailRegex.test(email);
  }

  return false;
}

function isValidPhoneNumber(phone) {
  const phoneRegex = /^\+380 \d{2} \d{3} \d{2} \d{2}$/;
  return phoneRegex.test(phone);
}

router.post('/submit-order', async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new Order(orderData);
    const savedOrder = await newOrder.save();
    const orderId = savedOrder._id;

    if (!isValidEmail(orderData.email)) {
      return res.status(400).send('Некоректний формат електронної пошти');
    }

    if (!isValidPhoneNumber(orderData.phone)) {
      return res.status(400).send('Некоректний формат номеру телефону');
    }

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "e8d90731cf5268",
          pass: "9cd93ad4e0729b"
        },

    });
    
    const mailOptions = {
      from: orderData.email, 
      to: 'zhenyahahurin@gmail.com', 
      subject: `Нове замовлення №${orderId}`,
      text: `Ім'я: ${orderData.name}\nЕлектронна пошта: ${orderData.email}\nТелефон: ${orderData.phone}\nАдреса: ${orderData.address}\nКількість одиниць продукції: ${orderData.productQuantity}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Помилка при відправленні пошти:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).send('Замовлення успішно відправлено');
  } catch (error) {
    console.error('Помилка при обробці POST-запиту:', error);
    res.status(500).send('Помилка сервера');
  }
});

module.exports = router;