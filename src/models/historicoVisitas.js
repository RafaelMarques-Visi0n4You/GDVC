const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const Servicos = require('./servicos');
const Visitas = require('./visitas');

const HistoricoVisitas = sequelize.define('historico_visitas', {
    historico_visita_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    servico_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'servicos',
            key: 'servico_id'
        }
    },
    visita_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'visitas',
            key: 'visita_id'
        }
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    timestamps: false,
    tableName: 'historico_visitas'
});

HistoricoVisitas.belongsTo(Servicos, {foreignKey: 'servico_id'});
HistoricoVisitas.belongsTo(Visitas, {foreignKey: 'visita_id'});

HistoricoVisitas.sync({ force: false })
.then(() => {
    // console.log('HistoricoVisitas table created');
})
.catch((error) => {
    console.error('Error creating HistoricoVisitas table:', error);
});




module.exports = HistoricoVisitas;
