const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const Empresas = require('./empresas');
const Equipas = require('./equipas');
const Departamento = require('./departamentos');

const Funcionarios = sequelize.define('funcionarios', {
    funcionario_id: {
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
    numero_mecanografico: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nome_completo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    contacto: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    morada: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cod_postal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    localidade: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cargo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    departamento_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'departamentos',
            key: 'departamento_id'
        }
    },
    criado_por_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'funcionarios'
});

Funcionarios.belongsTo(Empresas, { foreignKey: 'empresa_id' });
Funcionarios.belongsTo(Equipas, { foreignKey: 'equipa_id' });
Funcionarios.belongsTo(Departamento, { foreignKey: 'departamento_id' });


Funcionarios.sync( )
    .then(() => {
        // console.log('Funcionarios table created');
    })
    .catch((error) => {
        console.error('Error creating Funcionarios table:', error);
    });


module.exports = Funcionarios;