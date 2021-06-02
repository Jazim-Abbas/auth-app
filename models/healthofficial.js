'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthOfficial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  HealthOfficial.init({
    name: DataTypes.STRING,
    familyName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    verificationCode: DataTypes.INTEGER
    
  }, {
    sequelize,
    modelName: 'HealthOfficial',
  });
  return HealthOfficial;
};