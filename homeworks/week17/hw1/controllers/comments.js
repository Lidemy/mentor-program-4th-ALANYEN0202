/* eslint-disable no-undef,  arrow-body-style */
const db = require('../models');

const { Comment } = db;
const { User } = db;


const commentController = {
  add: ((req, res) => {
    const { userId } = req.session;
    const { title, content } = req.body;
    if (!userId || !content || !title) {
      req.flash('errorMessage', '欄位不得為空');
      res.redirect('back');
    }
    Comment.create({
      title,
      content,
      UserId: userId,
    }).then(() => {
      res.redirect('/');
    }).catch((err) => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  }),

  comments: (req, res) => {
    res.render('comments');
  },

  read: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
      },
      include: User,
    }).then((comment) => {
      res.render('read', {
        comment,
      });
    });
  },

  index: ((req, res) => {
    Comment.findAll({
      include: User,
      order: [
        ['id', 'DESC'],
      ],
    }).then((comments) => {
      res.render('index', {
        comments,
      });
    });
  }),

  admin: ((req, res) => {
    Comment.findAll({
      include: User,
      where: {
        UserId: req.session.userId,
      },
      order: [
        ['id', 'DESC'],
      ],
    }).then((comments) => {
      res.render('admin', {
        comments,
      });
    });
  }),

  delete: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId,
      },
    }).then((comment) => {
      return comment.destroy();
    }).then(() => {
      res.redirect('/');
    }).catch(() => {
      res.redirect('/');
    });
  },

  update: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
      },
    }).then((comment) => {
      res.render('update', {
        comment,
      });
    });
  },

  handelupdate: (req, res) => {
    Comment.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId,
      },
    }).then((comment) => {
      return comment.update({
        title: req.body.title,
        content: req.body.content,
      });
    }).then(() => {
      res.redirect('/');
    }).catch(() => {
      res.redirect('/');
    });
  },
};

module.exports = commentController;
