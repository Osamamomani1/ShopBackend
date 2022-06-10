"use strict";

const express = require("express");
const authRouter = express.Router();
const { users } = require("../models/index");
const basicAuth = require("../middlewear/basicAuth");
const bearerAuth = require("../middlewear/bearerAuth");
const {sellerCollection,shopperCollection}=require("../models/index")

authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    console.log(userRecord);
    if(userRecord.role==='seller'){
      let update = req.body;
      update.userId =userRecord.id;
      await sellerCollection.create(update);
    }else if(userRecord.role==='shopper'){
      let update = req.body;
      update.userId =userRecord.id;
      await shopperCollection.create(update);
    }
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post("/signin", basicAuth, (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token,
  };
  res.status(200).json(user);
});


//  ====== get workers to display them in the home page or sevice page
authRouter.get("/getAllSellers", async (req, res) => {
  let user = await users.findAll();
  let newArr = user.filter((value) => {
    if (value.dataValues.role == "seller") return value;
  });
  res.status(200).send(newArr);
});

module.exports = authRouter;