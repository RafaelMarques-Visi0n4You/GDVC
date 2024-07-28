import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Contratos from './contratos.js';
import AgendaServicos from './agendaServicos.js';
import ContaUtilizadores from './contaUtilizadores.js';





const Visitas = sequelize.define('visitas', {
    visita_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    contrato_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'contratos',
            key: 'contrato_id'
        }
    },
    agenda_servico_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'agenda_servicos',
            key: 'agenda_servico_id'
        }
    },
    tipo_marcacao: {
        type: DataTypes.INTEGER
    },
    data_visita: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hora_visita_inicio: {
        type: DataTypes.TIME
    },
    hora_visita_fim: {
        type: DataTypes.TIME
    },
    estado_servico: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isIn: [['agendada', 'terminada', 'cancelada', 'em andamento', 'pendente', 'a aguardar', 'nao aprovada']]
        }
    },
    inicio_visita: {
        type: DataTypes.DATE
    },
    fim_visita: {
        type: DataTypes.DATE
    },
    iniciado_por_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'conta_utilizadores',
            key: 'conta_utilizador_id'
        }
    }
}, {
    timestamps: false,
    tableName: 'visitas'
});

Visitas.belongsTo(Contratos, { foreignKey: 'contrato_id' });
Visitas.belongsTo(AgendaServicos, { foreignKey: 'agenda_servico_id' });
Visitas.belongsTo(ContaUtilizadores, { foreignKey: 'iniciado_por_id' });


Visitas.sync({ force: false })
    .then(() => {
        //console.log('Visitas table created');
    })
    .catch((error) => {
        console.error('Error creating Visitas table:', error);
    });

export default Visitas;