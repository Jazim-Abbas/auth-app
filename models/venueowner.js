'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VenueOwner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  VenueOwner.init({
    name: DataTypes.STRING,
    familyName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    verificationCode: DataTypes.INTEGER,
    venueName: DataTypes.STRING,
    streetNumber: DataTypes.INTEGER,
    streetName: DataTypes.STRING,
    town: DataTypes.STRING,
    postcode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'VenueOwner',
  });
  return VenueOwner;
};