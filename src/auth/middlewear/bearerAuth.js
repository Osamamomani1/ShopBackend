"use strict";

const { users } = require("../models/index");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      console.log('-2-2->',req.headers.authorization);
      _authError();
    }

    const token = req.headers.authorization.split(" ").pop();
    const validUser = await users.authenticateToken(token);
    console.log('ahah',validUser);
    req.user = validUser;
    req.token = validUser.token;
    req.userId = validUser.id;
    req.role = validUser.role;
    console.log("from barer=====>",validUser.role);
    next();
  } catch (e) {
    console.log(e);
    _authError();
  }

  function _authError() {
    next("Invalid Login");
  }
};