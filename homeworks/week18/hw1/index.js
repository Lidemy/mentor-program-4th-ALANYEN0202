const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 8002;

const usersController = require('./controllers/users');
const lotteryController = require('./controllers/lotterys');
const questionsController = require('./controllers/questions');
const productsController = require('./controllers/products');

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
  next();
});

app.get('/', lotteryController.index);

app.get('/admin', usersController.admin);

app.get('/questions', questionsController.questions);

app.get('/questions/admin', questionsController.admin);

app.post('/questions_add', questionsController.add, redirectToBack);

app.get('/delete_questions/:id', questionsController.delete, redirectToBack);

app.get('/menu', productsController.menu);

app.get('/update_questions/:id', questionsController.update);

app.post('/questions_update/:id', questionsController.handelupdate, redirectToBack);

app.get('/menu/admin', productsController.menuadmin);

app.post('/menu_add', productsController.handelmenuadd, redirectToBack);

app.get('/delete_product/:id', productsController.delete, redirectToBack);

app.get('/update_product/:id', productsController.update);

app.post('/update_product/:id', productsController.handelupdate, redirectToBack);

app.get('/getprize', lotteryController.getprize);

app.get('/login', usersController.login);

app.post('/login', usersController.handellogin, redirectToBack);

app.get('/register', usersController.register);

app.post('/register', usersController.handelregister, redirectToBack);

app.get('/logout', usersController.logout);

app.get('/lottery/admin', lotteryController.admin);

app.post('/prize_add', lotteryController.add, redirectToBack);

app.get('/update_prize/:id', lotteryController.update);

app.post('/update_prize/:id', lotteryController.handelupdate, redirectToBack);

app.get('/delete_prize/:id', lotteryController.delete, redirectToBack);

app.get('/get_prize/:id', lotteryController.handelgetprize, redirectToBack);

app.listen(port, () => {
  console.log(`wellcome! ${port}`);
});
