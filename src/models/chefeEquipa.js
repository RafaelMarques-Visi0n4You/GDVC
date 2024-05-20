const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const Funcionarios = require('./funcionarios');
const Equipas = require('./equipas');

const ChefeEquipa = sequelize.define('chefe_equipa', {
    funcionario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'funcionarios',
            key: 'funcionario_id'
        }
    },
    equipa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'equipas',
            key: 'equipa_id'
        }
    }
}, {
    timestamps: false,
    tableName: 'chefe_equipa'
});

ChefeEquipa.belongsTo(Funcionarios, {foreignKey: 'funcionario_id'});
ChefeEquipa.belongsTo(Equipas, {foreignKey: 'equipa_id'});


ChefeEquipa.sync({ force: false })
.then(() => {
    // console.log('ChefEquipa table created');
})
.catch((error) => {
    console.error('Error creating ChefeEquipa table:', error);
});

module.exports = ChefeEquipa;