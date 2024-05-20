const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const Empresas = require('./empresas');
const Departamento = require('./departamentos');

const Equipas = sequelize.define('equipas', {
    equipa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    empresa_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'empresas',
            key: 'empresa_id'
        }
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    criado_por_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    departamento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'departamentos',
            key: 'departamento_id'
        }
    },
    cor_equipa: {
        type: DataTypes.TEXT,
        unique: true,
    },
}, {
    timestamps: false,
    tableName: 'equipas'
});

Equipas.belongsTo(Empresas, { foreignKey: 'empresa_id' });
Equipas.belongsTo(Departamento, { foreignKey: 'departamento_id' });


Equipas.sync( { force: false })
    .then(() => {
        //console.log('Equipas table created');
    })
    .catch((error) => {
        console.error('Error creating Equipas table:', error);
    });

module.exports = Equipas;