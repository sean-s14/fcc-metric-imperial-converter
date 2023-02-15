"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const { input } = req.query;

    const initUnit = convertHandler.getUnit(input);
    const initNum = convertHandler.getNum(input);

    if (initUnit === "invalid unit" && initNum === "invalid number") {
      return res.send("invalid number and unit");
    } else if (initUnit === "invalid unit") {
      return res.send("invalid unit");
    } else if (initNum === "invalid number") {
      return res.send("invalid number");
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const fullInitUnit = convertHandler.spellOutUnit(initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const fullReturnUnit = convertHandler.spellOutUnit(returnUnit);

    const string = convertHandler.getString(
      initNum,
      fullInitUnit,
      returnNum,
      fullReturnUnit
    );

    return res.json({ initNum, initUnit, returnNum, returnUnit, string });
  });
};
