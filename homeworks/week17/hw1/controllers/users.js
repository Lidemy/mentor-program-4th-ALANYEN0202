/* eslint-disable no-undef,  arrow-body-style, consistent-return */
const bcrypt = require('bcrypt');
const db = require('../models');

const saltRounds = 10;
const { User } = db;

const usersController = {

  login: (req, res) => {
    res.render('login');
  },

  handellogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash('errorMessage', '請填寫帳號密碼');
      return next();
    }
    User.findOne({
      where: {
        username,
      },
    }).then((user) => {
      if (!user) {
        req.flash('errorMessage', '帳號或密碼錯誤');
        return next();
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          req.flash('errorMessage', '帳號或密碼錯誤');
          return next();
        }
        req.session.username = user.username;
        req.session.userId = user.id;
        res.redirect('/');
      });
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },

  register: (req, res) => {
    res.render('register');
  },

  handelregister: (req, res, next) => {
    const { username, password, nickname } = req.body;
    if (!username || !password || !nickname) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      User.create({
        username,
        password: hash,
        nickname,
      }).then((user) => {
        req.session.username = username;
        req.session.userId = user.id;
        res.redirect('/');
      }).catch((error) => {
        req.flash('errorMessage', error.toString());
        return next();
      });
    });
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  },

};

module.exports = usersController;
