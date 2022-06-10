"use strict";

const shopperModel = (sequelize, DataTypes) => {
  const model = sequelize.define("shopper", {
    cart: { type: DataTypes.ARRAY(DataTypes.JSON),defaultValue: [] },
    recently: { type: DataTypes.ARRAY(DataTypes.JSON),defaultValue: [] },
    userId: { type: DataTypes.INTEGER },
  });
  return model;
};

module.exports = shopperModel;