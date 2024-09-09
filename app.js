const express = require('express');
const path = require('path');
const app = express();
const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];
app.use(express.urlencoded({ extended: true }));
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

const PORT = process.env.PORT || 8000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});
app.get('/new', (req, res) => {
  res.render('form');
});
app.post('/new', (req, res) => {
  console.log(req.body);
  messages.push({
    text: req.body.messageText,
    user: req.body.author,
    added: new Date(),
  });
  res.redirect('/');
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
