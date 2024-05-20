const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');

const tipoServicos = sequelize.define('tipo_servicos', {
    tipo_servico_id: {
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
    tableName: 'tipo_servicos'
});

tipoServicos.sync( { force: false })
  .then(() => {
    //console.log('tipoServicos table created');
  })
  .catch((error) => {
    console.error('Error creating tipoServicos table:', error);
  });

module.exports = tipoServicos;