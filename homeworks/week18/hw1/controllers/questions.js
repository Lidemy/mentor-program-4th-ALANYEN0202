/* eslint-disable arrow-parens,  arrow-body-style, consistent-return */
const db = require('../models');

const { Question } = db;

const questionsController = {

  questions: ((req, res) => {
    Question.findAll().then(questions => {
      res.render('questions', {
        questions,
      });
    });
  }),

  admin: ((req, res) => {
    Question.findAll().then(questions => {
      res.render('questionsadmin', {
        questions,
      });
    });
  }),

  add: ((req, res, next) => {
    const { title, content } = req.body;
    const { username } = req.session;
    if (!title || !content || !username) {
      req.flash('errorMessage', '欄位不得為空');
      return next();
    }
    Question.create({
      title,
      content,
      username,
    }).then(() => {
      res.redirect('back');
    }).catch(err => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  }),

  update: ((req, res) => {
    Question.findOne({
      where: {
        id: req.params.id,
      },
    }).then(question => {
      res.render('questionupdate', {
        question,
      });
    });
  }),

  handelupdate: ((req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
      req.flash('errorMessage', '欄位不得為空');
      return next();
    }
    Question.findOne({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    }).then(question => {
      return question.update({
        title,
        content,
      });
    }).then(() => {
      res.redirect('/questions/admin');
    }).catch(() => {
      return res.redirect('/questions/admin');
    });
  }),

  delete: ((req, res, next) => {
    Question.findOne({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    }).then(question => {
      return question.destroy();
    }).then(() => {
      res.redirect('back');
    }).catch(() => {
      return next();
    });
  }),

};

module.exports = questionsController;
