'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Template.init({
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `userId required`
        }
      }
    },
    projectTitle: {
      type: DataTypes.STRING,
      validate: {
        notEmpty : {
          msg: 'projectTitle required'
        },
        notNull: {
          msg: 'projectTitle required'
        }
      },
      allowNull: false
    },
    navbar: {
      type: DataTypes.JSON
    },
    main: {
      type: DataTypes.JSON
    },
    about: {
      type: DataTypes.JSON
    },
    service: {
      type: DataTypes.JSON
    },
    contact: {
      type: DataTypes.JSON
    },
    footer: {
      type: DataTypes.JSON
    },
  }, {
    sequelize,
    modelName: 'Template',
  });
  return Template;
};