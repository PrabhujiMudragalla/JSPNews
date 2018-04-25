const controller = require('../controllers/news');
const express = require('express');
const app = express.Router();


app.post('/news', controller.createNews);
app.get('/news', controller.getNews);
app.get('/news/:id', controller.getNewsById);
app.put('/publish/news/:id', controller.publishNews);
app.put('/news/:id', controller.updateNewsById);
app.delete('/news/:id', controller.deleteNews);

module.exports = app;