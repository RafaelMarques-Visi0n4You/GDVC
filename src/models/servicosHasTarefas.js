import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Servicos from './servicos.js';
import ContaUtilizadores from './contaUtilizadores.js';


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
    }
}, {
    timestamps: false,
    tableName: 'servicos_has_tarefas'
});

ServicosHasTarefas.belongsTo(Servicos, { foreignKey: 'servico_id' });
ServicosHasTarefas.belongsTo(ContaUtilizadores, { foreignKey: 'criado_por_id' });


ServicosHasTarefas.sync({ force: false })
    .then(() => {
        // console.log('ServicosHasTarefas table created');
    })
    .catch((error) => {
        console.error('Error creating ServicosHasTarefas table:', error);
    });

export default ServicosHasTarefas;