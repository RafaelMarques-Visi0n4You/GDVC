import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Visitas from './visitas.js';
import ContaUtilizadores from './contaUtilizadores.js';

const AnomaliasVisita = sequelize.define('anomalias_visita', {
    anomalia_visita_id: {
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
    anomalia: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fotografia: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    estado: {
        type: DataTypes.TEXT
    },
    data_criacao: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
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
    tableName: 'anomalias_visita'
});


AnomaliasVisita.belongsTo(Visitas, { foreignKey: 'visita_id' });
AnomaliasVisita.belongsTo(ContaUtilizadores, { foreignKey: 'criado_por_id' });


AnomaliasVisita.sync({ force: false })
    .then(() => {
        // console.log('AnomaliasVisita table created');
    })
    .catch((error) => {
        console.error('Error creating AnomaliasVisita table:', error);
    });


export default AnomaliasVisita;