"use strict";
require("dotenv").config();
const express = require("express");
const Router = express.Router();
const {
  sellerCollection,
  sellertModel,
  users,
} = require("../models/index");
const bearerAuth = require("../middlewear/bearerAuth");
const permissions = require("../middlewear/acl");

// ====================== main Routes ================================
Router.put("/seller/updateany", bearerAuth, sellerUpdate);
Router.post("/seller", bearerAuth, createData);
Router.get("/sellerData", bearerAuth, permissions("write"), getData);


//  =========== start main function ===============


async function getData(req, res) {
  let id = req.userId;
  let seller = await sellerCollection.read(id);
  res.status(200).send(seller);
}

// ========= for create Data for client
async function createData(req, res) {
  let newData = req.body;
  newData.userId = req.userId;
  let seller = await sellerCollection.create(newData);
  res.status(200).json(seller);
}
//========== update for client data
async function sellerUpdate(req, res) {
  let update = req.body;
  let data = await sellertModel.findOne({ where: { userId: req.userId } });
  let id = data.dataValues.id;
  let seller = await sellerCollection.update(id, update);
  res.send(seller);
}



module.exports = Router;