import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Empresa from './empresas.js';

const Cliente = sequelize.define('clientes', {
    cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    empresa_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'empresas', // Use the name of the table here
            key: 'empresa_id'
        }
    },
    nome_completo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    empresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'empresas',
            key: 'empresa_id'
        }
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


Cliente.belongsTo(Empresa, { foreignKey: 'empresa_id' });

Cliente.sync({ force: false })
    .then(() => {
        // console.log('Cliente table created');
    })
    .catch((error) => {
        console.error('Error creating Cliente table:', error);
    });

export default Cliente;