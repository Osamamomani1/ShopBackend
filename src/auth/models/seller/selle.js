"use strict";

const sellerModel = (sequelize, DataTypes) => {
  const model = sequelize.define("sller", {
   
    
    items: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    bio: { type: DataTypes.STRING, defaultValue: " " },
    revenues: { type: DataTypes.INTEGER },
    orders: { type: DataTypes.ARRAY(DataTypes.JSON), defaultValue: [] },
    userId: { type: DataTypes.INTEGER },
  });
  return model;
};

module.exports = sellerModel;