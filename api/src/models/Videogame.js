const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    background_image: {
      type: DataTypes.STRING,
    },
    released:{
      type: DataTypes.DATE,
    },
    rating:{
      type: DataTypes.DECIMAL,
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.DECIMAL),
      allowNull: false,
    },
  });
};
