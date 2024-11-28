var DataTypes = require("sequelize").DataTypes;
var _products = require("./products");

function initModels(sequelize) {
  var products = _products(sequelize, DataTypes);

 
  return {
    products,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
