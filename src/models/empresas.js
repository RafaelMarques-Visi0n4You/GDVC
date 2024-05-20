import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';


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
    logo_empresa: {
        type: DataTypes.TEXT
    },
}, {
    timestamps: false,
    tableName: 'empresas'
});



Empresas.sync()
    .then(() => {
        // console.log('empresas table created');
    })
    .catch((error) => {
        console.error('Error creating empresas table:', error);
    });

export default Empresas;
