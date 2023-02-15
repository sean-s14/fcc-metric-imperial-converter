function ConvertHandler() {
  this.getNum = function (input) {
    // console.log("Input Num :", input)
    const numRegex = new RegExp(/\d/);
    if (input.match(numRegex) === null) {
      return 1;
    }

    // Checks for double-fraction (e.g. 2/3/2 ) and returns error
    const doubleFractionRegex = new RegExp(/\/.*\//);
    const doubleFractionMatch = input.match(doubleFractionRegex);
    if (doubleFractionMatch !== null) {
      return "invalid number";
    }

    // Finds num or expression
    const regex = new RegExp(/^[^a-z]+/i);
    const match = input.match(regex)[0];

    // Checks for expression and evaluates if found
    const regex2 = new RegExp(/\//);
    const match2 = match.match(regex2);

    if (match2 !== null) {
      let arr = match.split("/");
      return parseFloat(arr[0]) / parseFloat(arr[1]);
    }

    return parseFloat(match);
  };

  this.getUnit = function (input) {
    const regex = new RegExp(/[a-z]+$/i);
    let match = input.match(regex);
    if (match === null) {
      return "invalid unit";
    }
    match = match[0].toLowerCase();
    // console.log("Match :", match)
    if (!["lbs", "kg", "mi", "km", "gal", "l"].includes(match)) {
      // console.log('invalid unit')
      return "invalid unit";
    }
    if (match === "l") {
      return "L";
    }
    return match;
  };

  this.getReturnUnit = function (initUnit) {
    let result;

    switch (initUnit.toLowerCase()) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
        result = "invalid unit";
    }

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result;
    switch (unit.toLowerCase()) {
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      default:
        result = "invalid unit";
    }
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let result;
    switch (initUnit.toLowerCase()) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = "invalid unit";
    }

    return parseFloat(result.toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    // if (returnUnit === 'liters') {
    //   returnUnit = 'Liters'
    // }
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
}

module.exports = ConvertHandler;
