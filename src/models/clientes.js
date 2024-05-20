const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');

const Cliente = sequelize.define('clientes', {
    cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome_completo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nif: {
        type: DataTypes.INTEGER,
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
    ativo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    }
}, {
    timestamps: false,
    tableName: 'clientes'
});

Cliente.sync({ force: false })
.then(() => {
    // console.log('Cliente table created');
})
.catch((error) => {
    console.error('Error creating Cliente table:', error);
});

module.exports = Cliente;