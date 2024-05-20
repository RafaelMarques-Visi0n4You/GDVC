const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const Visitas = require('./visitas');

const NotasVisitas = sequelize.define('notas_visitas', {
    notas_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    visita_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'visitas',
            key: 'visita_id'
        }
    },
    nota: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    criado_por_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'notas_visitas'
});

NotasVisitas.belongsTo(Visitas, {foreignKey: 'visita_id'});


NotasVisitas.sync({ force: false })
.then(() => {
    // console.log('NotasVisitas table created');
})
.catch((error) => {
    console.error('Error creating NotasVisitas table:', error);
});

module.exports = NotasVisitas;