const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');

const Departamento = sequelize.define('departamentos', {
    departamento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'departamentos'
});

Departamento.sync( )
  .then(() => {
    // console.log('Departamento table created');
  })
  .catch((error) => {
    console.error('Error creating Departamento table:', error);
  });

module.exports = Departamento;