/* eslint-disable no-undef,  arrow-body-style, consistent-return */
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 8000;

const usersController = require('./controllers/users');
const commentController = require('./controllers/comments');

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

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

app.get('/', commentController.index);

app.get('/login', usersController.login);

app.post('/login', usersController.handellogin, redirectToBack);

app.get('/admin', commentController.admin);

app.get('/read/:id', commentController.read);

app.get('/register', usersController.register);

app.post('/register', usersController.handelregister, redirectToBack);

app.get('/comments', commentController.comments);

app.post('/comments', commentController.add, redirectToBack);

app.get('/update_comment/:id', commentController.update);

app.post('/update_comment/:id', commentController.handelupdate);

app.get('/deleted_comment/:id', commentController.delete);

app.get('/logout', usersController.logout);

app.listen(port, () => {
  console.log(`wellcome to ${port}`);
});
