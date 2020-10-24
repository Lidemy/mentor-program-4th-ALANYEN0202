/* eslint-disable no-unused-vars, strict,  arrow-parens,  arrow-body-style */
/* eslint-disable import/no-dynamic-require, global-require, no-use-before-define */
/* eslint-disable  prefer-template, import/no-unresolved, no-path-concat */

'use strict';

const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Question.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    username: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Question',
  });
  return Question;
};
