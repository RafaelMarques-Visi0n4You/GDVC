import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Empresas from './empresas.js';
import Equipas from './equipas.js';
import ContaUtilizadores from './contaUtilizadores.js';


const AgendaServicos = sequelize.define('agenda_servicos', {
    agenda_servico_id: {
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
    equipa_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'equipas',
            key: 'equipa_id'
        }
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    ativo: {
        type: DataTypes.SMALLINT,
        allowNull: false
    },
    criado_por_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'conta_utilizadores',
            key: 'conta_utilizador_id'
        }
    },
    aprovado_por_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'conta_utilizadores',
            key: 'conta_utilizador_id'
        }
    }
}, {
    timestamps: false,
    tableName: 'agenda_servicos'
});

AgendaServicos.belongsTo(Empresas, { foreignKey: 'empresa_id' });
AgendaServicos.belongsTo(Equipas, { foreignKey: 'equipa_id' });
AgendaServicos.belongsTo(ContaUtilizadores, { foreignKey: 'criado_por_id' });
AgendaServicos.belongsTo(ContaUtilizadores, { foreignKey: 'aprovado_por_id' });


AgendaServicos.sync({ force: false })
    .then(() => {
        // console.log('AgendaServicos table created');
    })
    .catch((error) => {
        console.error('Error creating AgendaServicos table:', error);
    });

export default AgendaServicos;