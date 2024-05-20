import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import planoSubscricao from './planoSubscricao.js';
import Empresas from './empresas.js';


const planoSubscricaoEmpresas = sequelize.define('plano_subscricao_empresas', {
    plano_subscricao_empresa_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    data_subscricao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    ativo: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1
    },
    plano_subscricao_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'plano_subscricao',
            key: 'plano_subscricao_id'
        }
    },
    empresa_id: {
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: 'empresas',
            key: 'empresa_id'
        }
    },

}, {
    tableName: 'plano_subscricao_empresas',
    timestamps: false
});


planoSubscricaoEmpresas.belongsTo(Empresas, { foreignKey: 'empresa_id' });

planoSubscricaoEmpresas.belongsTo(planoSubscricao, { foreignKey: 'plano_subscricao_id' });




planoSubscricaoEmpresas.sync({ force: false })
    .then(() => {
        // console.log('planoSubscricao table created');
    })
    .catch((error) => {
        console.error('Error creating planoSubscricaoEmpresas table:', error);
    });



export default planoSubscricaoEmpresas;