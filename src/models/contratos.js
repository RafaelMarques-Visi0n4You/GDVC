import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Cliente from './clientes.js';
import ContaUtilizador from './contaUtilizadores.js';


const Contratos = sequelize.define('contratos', {
    contrato_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'cliente_id'
        }
    },
    nome: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    morada_servico: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    cod_postal_servico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    localidade_servico: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    data_inicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    data_fim: {
        type: DataTypes.DATE,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ativo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    tipo_contrato: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    criado_por_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'conta_utilizadores',
            key: 'conta_utilizador_id'
        }
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')

    }
}, {
    timestamps: false,
    tableName: 'contratos'
});

Contratos.belongsTo(Cliente, { foreignKey: 'cliente_id' });
Contratos.belongsTo(ContaUtilizador, { foreignKey: 'criado_por_id' });


Contratos.sync({ force: false })
    .then(() => {
        // console.log('Contratos table created');
    })
    .catch((error) => {
        console.error('Error creating Contratos table:', error);
    });

export default Contratos;