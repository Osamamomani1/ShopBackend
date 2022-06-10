"use strict";
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const DATABASE_URL = process.env.DATABASE_URL;
const shopper = require("./shopper/shopper");
const seller = require("./seller/selle");
const user = require("./user");
const Collection = require("./dataCollection");


const sequelize = new Sequelize(DATABASE_URL);

const userModel = user(sequelize, DataTypes);
const shopperModel = shopper(sequelize, DataTypes);
const sellerModel = seller(sequelize, DataTypes);

userModel.hasMany(shopperModel, { foreignKey: "userId", sourceKey: "id" });
shopperModel.belongsTo(userModel, { foreignKey: "userId", targetKey: "id" });

userModel.hasMany(sellerModel, { foreignKey: "userId", sourceKey: "id" });
sellerModel.belongsTo(userModel, { foreignKey: "userId", targetKey: "id" });

const shopperCollection = new Collection(shopperModel);
const sellerCollection = new Collection(sellerModel);
const usersCollection = new Collection(userModel);

module.exports = {
  db: sequelize,
  users: userModel,
  sellerModel: sellerModel,
  shopperCollection: shopperCollection,
  sellerCollection: sellerCollection,
  shopperModel: shopperModel,
  usersCollection: usersCollection,
  userModel: userModel,
};