/* eslint-disable no-undef,  arrow-body-style, consistent-return, no-plusplus, */
/* eslint-disable prefer-arrow-callback */
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
      bcrypt.compare(password, user.password, function (err, result) {
        if (err || !result) {
          req.flash('errorMessage', '帳號或密碼錯誤');
          return next();
        }
        req.session.username = user.username;
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
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      User.create({
        username,
        password: hash,
        nickname,
      }).then(() => {
        req.session.username = username;
        res.redirect('/');
      }).catch(() => {
        req.flash('errorMessage', err.toString());
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
