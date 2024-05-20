const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const Servicos = require('./servicos');
const ContaUtilizadores = require('./contaUtilizadores');

const ServicosHasTarefas = sequelize.define('servicos_has_tarefas', {
    servico_has_tarefas_id: {
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
    tarefa: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    criado_por_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'conta_utilizadores',
            key: 'conta_utilizador_id'
        }
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    ultima_atualizacao: {
        type: DataTypes.DATE
    },
    atualizado_por_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'conta_utilizadores',
            key: 'conta_utilizador_id'
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
    tableName: 'servicos_has_tarefas'
});

ServicosHasTarefas.belongsTo(Servicos, {foreignKey: 'servico_id'});
ServicosHasTarefas.belongsTo(ContaUtilizadores, {foreignKey: 'criado_por_id'});
ServicosHasTarefas.belongsTo(ContaUtilizadores, {foreignKey: 'atualizado_por_id'});


ServicosHasTarefas.sync({ force: false })
.then(() => {
    // console.log('ServicosHasTarefas table created');
})
.catch((error) => {
    console.error('Error creating ServicosHasTarefas table:', error);
});

module.exports = ServicosHasTarefas;