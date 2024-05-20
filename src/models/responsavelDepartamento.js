import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Departamentos from './departamentos.js';
import Funcionarios from './funcionarios.js';


const ResponsavelDepartamento = sequelize.define('responsavel_departamento', {
    departamento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        references: {
            model: 'departamentos',
            key: 'departamento_id'
        },

    },
    funcionario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        references: {
            model: 'funcionarios',
            key: 'funcionario_id'
        }
    }
}, {
    timestamps: false,
    tableName: 'responsavel_departamento'
});

ResponsavelDepartamento.belongsTo(Departamentos, { foreignKey: 'departamento_id' });
ResponsavelDepartamento.belongsTo(Funcionarios, { foreignKey: 'funcionario_id' });


ResponsavelDepartamento.sync({ force: false })
    .then(() => {
        // console.log('ResponsavelDepartamento table created');
    })
    .catch((error) => {
        console.error('Error creating ResponsavelDepartamento table:', error);
    });

export default ResponsavelDepartamento;