const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const ServicosHasTarefas = require('./servicosHasTarefas');
const Visitas = require('./visitas');

const TarefasServicosVisita = sequelize.define('tarefas_servicos_visita', {
    tarefa_servico_visita_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    visita_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'visitas',
            key: 'visita_id'
        }
    },
    tarefas: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    estado: {
        type: DataTypes.TEXT,
        validate: {
            isIn: [['em andamento', 'concluido']]
        }
    },
    tempo_estimado: {
        type: DataTypes.INTEGER
    },
    tipo_tempo_estimado: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false,
    tableName: 'tarefas_servicos_visita'
});


TarefasServicosVisita.belongsTo(Visitas, {foreignKey: 'visita_id'});


TarefasServicosVisita.sync({ force: false })
.then(() => {
    // console.log('TarefasServicosVisita table created');
})
.catch((error) => {
    console.error('Error creating TarefasServicosVisita table:', error);
});


module.exports = TarefasServicosVisita;
