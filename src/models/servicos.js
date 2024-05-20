import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import Empresas from './empresas.js';
import TipoServicos from './tipoServicos.js';
import ContaUtilizador from './contaUtilizadores.js';


const Servicos = sequelize.define('servicos', {
    servico_id: {
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
    tipo_servico_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'tipo_servicos',
            key: 'tipo_servico_id'
        }
    },
    nome: {
        type: DataTypes.TEXT,
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
    preco_hora: {
        type: DataTypes.DECIMAL
    },
    tempo_estimado: {
        type: DataTypes.INTEGER
    },
    tipo_tempo_estimado: {
        type: DataTypes.TEXT
    },
    data_criacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')

    },
    ultima_atualizacao: {
        type: DataTypes.DATE
    },
    criado_por_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'conta_utilizadores',
            key: 'conta_utilizador_id'
        }
    }
}, {
    timestamps: false,
    tableName: 'servicos'
});

Servicos.belongsTo(Empresas, { foreignKey: 'empresa_id' });
Servicos.belongsTo(TipoServicos, { foreignKey: 'tipo_servico_id' });
Servicos.belongsTo(ContaUtilizador, { foreignKey: 'criado_por_id' });

Servicos.sync({ force: false })
    .then(() => {
        //console.log('Servicos table created');
    })
    .catch((error) => {
        console.error('Error creating Servicos table:', error);
    });

export default Servicos;