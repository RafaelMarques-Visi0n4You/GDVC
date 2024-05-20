const { sequelize } = require('../config/sequelize');
const { DataTypes } = require('sequelize');
const planoSubscricao = require('./planoSubscricao');


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
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    plano_subscricao_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'plano_subscricao',
            key: 'plano_subscricao_id'
        }
    }

}, {
    tableName: 'plano_subscricao_empresas',
    timestamps: false
});

planoSubscricaoEmpresas.belongsTo(planoSubscricao, { foreignKey: 'plano_subscricao_id' });

planoSubscricaoEmpresas.sync({ force: false })
    .then(() => {
        // console.log('planoSubscricao table created');
    })
    .catch((error) => {
        console.error('Error creating planoSubscricaoEmpresas table:', error);
    });



module.exports = planoSubscricaoEmpresas;