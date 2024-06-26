import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';


const planoSubscricao = sequelize.define('plano_subscricao', {
    plano_subscricao_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo_plano: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    limite_equipas: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    limite_servicos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    ativo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
}, {
    tableName: 'plano_subscricao',
    timestamps: false
});

planoSubscricao.sync({ force: false })
    .then(() => {
        // console.log('planoSubscricao table created');
    })
    .catch((error) => {
        console.error('Error creating planoSubscricao table:', error);
    });



export default planoSubscricao;