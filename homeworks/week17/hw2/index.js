/* eslint-disable no-undef,  arrow-body-style, consistent-return, no-plusplus, */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 8001;

const usersController = require('./controllers/users');
const lotteryController = require('./controllers/lotterys');

function redirectToBack(req, res) {
  res.redirect('back');
}
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(flash());

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.get('/', lotteryController.index);

app.get('/login', usersController.login);

app.post('/login', usersController.handellogin, redirectToBack);

app.get('/register', usersController.register);

app.post('/register', usersController.handelregister, redirectToBack);

app.get('/logout', usersController.logout);

app.get('/admin', lotteryController.admin);

app.post('/prize_add', lotteryController.add);

app.get('/update_prize/:id', lotteryController.update);

app.post('/update_prize/:id', lotteryController.handelupdate);

app.get('/delete_prize/:id', lotteryController.delete);

app.get('/get_prize/:id', lotteryController.getprize);

app.listen(port, () => {
  console.log(`haha ${port}`);
});
