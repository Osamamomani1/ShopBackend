"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const {
  shopperCollection,
  shoppertModel,
  users,
  sellerCollection,
} = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");

// ====================== main Routes ================================
Router.put("/client/updateany", bearerAuth, shopperUpdate);
Router.post("/client", bearerAuth, createData);
Router.get("/clientData", bearerAuth, permissions("read"), getData);


//  =========== start main function ===============


async function getData(req, res) {
  let id = req.userId;
  let shopper = await shopperCollection.read(id);
  res.status(200).send(shopper);
}

// ========= for create Data for client
async function createData(req, res) {
  let newData = req.body;
  newData.userId = req.userId;
  let shopper = await shopperCollection.create(newData);
  res.status(200).json(shopper);
}
//========== update for client data
async function shopperUpdate(req, res) {
  let update = req.body;
  let data = await shoppertModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let shopper = await shopperCollection.update(id, update);
  await sellerCollection.update(update.seller.idseller, update.seller)
  res.send(shopper);
}



module.exports = Router;