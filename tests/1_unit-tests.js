const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("read a whole number input", function () {
    assert.equal(convertHandler.getNum("10L"), 10.0);
  });
  test("read a decimal number input", function () {
    assert.equal(convertHandler.getNum("6.4lbs"), 6.4);
  });
  test("read a fractional input", function () {
    assert.equal(convertHandler.getNum("3/2kg"), 1.5);
  });
  test("read a fractional input with a decimal", function () {
    assert.equal(convertHandler.getNum("10/2.5gal"), 4.0);
  });
  test("return an error on a double-fraction", function () {
    assert.equal(convertHandler.getNum("10/3/3lbs"), "invalid number");
  });
  test("default to 1 when no numerical input is provided", function () {
    assert.equal(convertHandler.getNum("mi"), 1);
  });

  test("read each valid input unit", function () {
    assert.equal(convertHandler.getUnit("1gal"), "gal");
    assert.equal(convertHandler.getUnit("12L"), "L");
    assert.equal(convertHandler.getUnit("1mi"), "mi");
    assert.equal(convertHandler.getUnit("12km"), "km");
    assert.equal(convertHandler.getUnit("1lbs"), "lbs");
    assert.equal(convertHandler.getUnit("12kg"), "kg");
  });
  test("return an error for an invalid input unit", function () {
    assert.equal(convertHandler.getUnit("13js"), "invalid unit");
  });

  test("return the correct return unit for each valid input unit", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });

  test("correctly return the spelled-out string unit for each valid input unit", function () {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
    assert.equal(convertHandler.spellOutUnit("L"), "liters");
    assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
  });

  test("convert gal to L", function () {
    assert.equal(convertHandler.getReturnUnit("gal"), "L");
  });
  test("convert L to gal", function () {
    assert.equal(convertHandler.getReturnUnit("L"), "gal");
  });
  test("convert mi to km", function () {
    assert.equal(convertHandler.getReturnUnit("mi"), "km");
  });
  test("convert km to mi", function () {
    assert.equal(convertHandler.getReturnUnit("km"), "mi");
  });
  test("convert lbs to kg", function () {
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
  });
  test("convert kg to lbs", function () {
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
  });
});
