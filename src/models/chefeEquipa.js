import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Funcionarios from './funcionarios.js';
import Equipas from './equipas.js';

const ChefeEquipa = sequelize.define('chefe_equipa', {
    funcionario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'funcionarios',
            key: 'funcionario_id'
        }
    },
    equipa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'equipas',
            key: 'equipa_id'
        }
    }
}, {
    timestamps: false,
    tableName: 'chefe_equipa'
});

ChefeEquipa.belongsTo(Funcionarios, { foreignKey: 'funcionario_id' });
ChefeEquipa.belongsTo(Equipas, { foreignKey: 'equipa_id' });


ChefeEquipa.sync({ force: false })
    .then(() => {
        // console.log('ChefEquipa table created');
    })
    .catch((error) => {
        console.error('Error creating ChefeEquipa table:', error);
    });

export default ChefeEquipa;