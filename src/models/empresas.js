const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const planoSubscricaoEmpresas = require('./planoSubscricaoEmpresas');

const Empresas = sequelize.define('empresas', {
    empresa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nif: {
        type: DataTypes.STRING,
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
    ramo_atividade: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_adesao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    plano_subscricao_empresa_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'plano_subscricao_empresas',
            key: 'plano_subscricao_empresa_id'
        }
    }
}, {
    timestamps: false,
    tableName: 'empresas'
});

Empresas.belongsTo(planoSubscricaoEmpresas, { foreignKey: 'plano_subscricao_empresa_id' });


Empresas.sync( )
    .then(() => {
        // console.log('empresas table created');
    })
    .catch((error) => {
        console.error('Error creating empresas table:', error);
    });
    
module.exports = Empresas;
