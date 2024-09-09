const express = require('express');
const path = require('path');
const app = express();
const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: formateDate(new Date()),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: formateDate(new Date()),
  },
];
function formateDate(date) {
  const arr = date.toString().split(' ');
  let newDate = '';
  for (let i = 0; i < 5; i++) {
    newDate += arr[i] + ' ';
  }
  return newDate;
}

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
    added: formateDate(new Date()),
  });
  res.redirect('/');
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
