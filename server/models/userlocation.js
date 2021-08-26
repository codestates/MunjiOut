'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserLocation.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: 'userId',
      });
      UserLocation.belongsTo(models.Location, {
        onDelete: 'CASCADE',
        foreignKey: 'locationId'
      });
    }
  };
  UserLocation.init({
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserLocation',
  });
  return UserLocation;
};