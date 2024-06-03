import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Funcionario from './funcionarios.js';
import Cliente from './clientes.js';

const ContaUtilizador = sequelize.define('conta_utilizadores', {
    conta_utilizador_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    funcionario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'funcionarios', // Use the name of the table here
            key: 'funcionario_id'
        },
        allowNull: true
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes', // Use the name of the table here
            key: 'cliente_id'
        },
        allowNull: true
    },
    criado_por_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'conta_utilizadores', // Use the name of the table here
            key: 'conta_utilizador_id'
        }
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tipo_utilizador: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            isIn: [['nivel1', 'nivel2', 'nivel3', 'nivel4']]
        }
    },
    ativo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    reset: {
        type: DataTypes.SMALLINT
    },
    notification: {
        type: DataTypes.TEXT
    }
}, {
    timestamps: false,
    tableName: 'conta_utilizadores'
});

ContaUtilizador.belongsTo(Funcionario, { foreignKey: 'funcionario_id' });
ContaUtilizador.belongsTo(ContaUtilizador, { foreignKey: 'criado_por_id' });
ContaUtilizador.belongsTo(Cliente, { foreignKey: 'cliente_id' });

ContaUtilizador.sync({ force: false })
    .then(() => {
        //   console.log('ContaUtilizador table synchronized successfully');
    })
    .catch((error) => {
        console.error('Error synchronizing ContaUtilizador table:', error);
    });

export default ContaUtilizador;
