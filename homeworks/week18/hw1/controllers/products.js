/* eslint-disable arrow-parens,  arrow-body-style, consistent-return */
const db = require('../models');

const { Products } = db;

const productsController = {

  menu: ((req, res) => {
    Products.findAll({
      order: [
        ['id', 'DESC'],
      ],
    }).then(products => {
      res.render('menu', {
        products,
      });
    });
  }),

  menuadmin: ((req, res) => {
    Products.findAll({
      order: [
        ['id', 'DESC'],
      ],
    }).then(products => {
      res.render('menuadmin', {
        products,
      });
    });
  }),

  handelmenuadd: ((req, res, next) => {
    const { username } = req.session;
    const { productsname, imgurl, prices } = req.body;
    if (!productsname || !imgurl || !prices || !username) {
      req.flash('errorMessage', '欄位不得為空');
      return next();
    }
    Products.create({
      productsname,
      imgurl,
      prices,
      username,
    }).then(() => {
      res.redirect('back');
    }).catch(() => {
      req.flash('errorMessage', '價格只能填數字');
      return next();
    });
  }),

  update: ((req, res) => {
    Products.findOne({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    }).then(product => {
      res.render('menuupdate', {
        product,
      });
    });
  }),

  handelupdate: ((req, res, next) => {
    const { productsname, imgurl, prices } = req.body;
    if (!productsname || !imgurl || !prices) {
      req.flash('errorMessage', '欄位不得為空');
      return next();
    }
    Products.findOne({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    }).then(product => {
      return product.update({
        productsname,
        imgurl,
        prices,
      });
    }).then(() => {
      res.redirect('/menu/admin');
    }).catch(() => {
      return res.redirect('/menu/admin');
    });
  }),

  delete: ((req, res, next) => {
    Products.findOne({
      where: {
        id: req.params.id,
        username: req.session.username,
      },
    }).then(product => {
      return product.destroy();
    }).then(() => {
      res.redirect('back');
    }).catch(() => {
      return next();
    });
  }),

};

module.exports = productsController;
