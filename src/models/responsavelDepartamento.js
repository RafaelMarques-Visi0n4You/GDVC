const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const Departamentos = require('./departamentos');
const Funcionarios = require('./funcionarios');


const ResponsavelDepartamento = sequelize.define('responsavel_departamento', {
    departamento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'departamentos',
            key: 'departamento_id'
        }
    },
    funcionario_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'funcionarios',
            key: 'funcionario_id'
        }
    }
}, {
    timestamps: false,
    tableName: 'responsavel_departamento'
});

ResponsavelDepartamento.belongsTo(Departamentos, {foreignKey: 'departamento_id'});
ResponsavelDepartamento.belongsTo(Funcionarios, {foreignKey: 'funcionario_id'});


ResponsavelDepartamento.sync({ force: false })
.then(() => {
    // console.log('ResponsavelDepartamento table created');
})
.catch((error) => {
    console.error('Error creating ResponsavelDepartamento table:', error);
});

module.exports = ResponsavelDepartamento;