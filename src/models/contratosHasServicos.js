import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Servicos from './servicos.js';
import Contratos from './contratos.js';

const ContratosHasServicos = sequelize.define('contratos_has_servicos', {
    contrato_has_servicos_id: {
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
    contrato_id: {
        type: DataTypes.INTEGER,
        
        references: {
            model: 'contratos',
            key: 'contrato_id'
        }
    },
    prioritario: {
        type: DataTypes.TEXT
    },

    data_contratacao: {
        type: DataTypes.DATE,
        allowNull: false
    },

}, {
    timestamps: false,
    tableName: 'contratos_has_servicos'
});

ContratosHasServicos.belongsTo(Servicos, { foreignKey: 'servico_id' });
ContratosHasServicos.belongsTo(Contratos, { foreignKey: 'contrato_id' });


ContratosHasServicos.sync({ force: false })
    .then(() => {
        // console.log('ContratosHasServicos table created');
    })
    .catch((error) => {
        console.error('Error creating ContratosHasServicos table:', error);
    });

export default ContratosHasServicos;
