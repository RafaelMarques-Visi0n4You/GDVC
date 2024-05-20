import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Equipas from './equipas.js';
import Servicos from './servicos.js';

const EquipasHasServicos = sequelize.define('equipas_has_servicos', {
    equipa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'equipas',
            key: 'equipa_id'
        }
    },
    servico_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'servicos',
            key: 'servico_id'
        }
    },
    nivel_experiencia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    timestamps: false,
    tableName: 'equipas_has_servicos'
});

EquipasHasServicos.belongsTo(Equipas, { foreignKey: 'equipa_id' });
EquipasHasServicos.belongsTo(Servicos, { foreignKey: 'servico_id' });


EquipasHasServicos.sync({ force: false })
    .then(() => {
        // console.log('EquipasHasServicos table created');
    })
    .catch((error) => {
        console.error('Error creating EquipasHasServicos table:', error);
    });

export default EquipasHasServicos;