import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Visitas from './visitas.js';

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
    tarefa: {
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
    }
}, {
    timestamps: false,
    tableName: 'tarefas_servicos_visita'
});


TarefasServicosVisita.belongsTo(Visitas, { foreignKey: 'visita_id' });


TarefasServicosVisita.sync({ force: false })
    .then(() => {
        // console.log('TarefasServicosVisita table created');
    })
    .catch((error) => {
        console.error('Error creating TarefasServicosVisita table:', error);
    });


export default TarefasServicosVisita;
