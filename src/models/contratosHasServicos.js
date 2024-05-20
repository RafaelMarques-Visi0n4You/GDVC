const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const Servicos = require('./servicos');
const Contratos = require('./contratos');
    
const ContratosHasServicos = sequelize.define('contratos_has_servicos', {
    servico_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'servicos',
            key: 'servico_id'
        }
    },
    contrato_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'contratos',
            key: 'contrato_id'
        }
    },
    prioritario: {
        type: DataTypes.TEXT
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_contratacao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    frequencia: {
        type: DataTypes.TEXT
    },
    qtd_vezes: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
    tableName: 'contratos_has_servicos'
});

ContratosHasServicos.belongsTo(Servicos, {foreignKey: 'servico_id'});
ContratosHasServicos.belongsTo(Contratos, {foreignKey: 'contrato_id'});


ContratosHasServicos.sync({ force: false })
.then(() => {
    // console.log('ContratosHasServicos table created');
})
.catch((error) => {
    console.error('Error creating ContratosHasServicos table:', error);
});

module.exports = ContratosHasServicos;
