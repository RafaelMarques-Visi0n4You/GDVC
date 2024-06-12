import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';
import tipoServicos from './tipoServicos.js';
import equipas from './equipas.js';


const TipoServicosHasEquipas = sequelize.define('tipo_servicos_has_equipas', {
    tipoServicos_has_equipas_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tipo_servico_id: {
    type: DataTypes.INTEGER,
    references: {
        model: 'tipo_servicos',
        key: 'tipo_servico_id'
    }
  },
  equipa_id:{
    type: DataTypes.INTEGER,
    references: {
        model: 'equipas',
        key: 'equipa_id'
    }
  },
}, {
  timestamps: false,
  tableName: 'tipo_servicos_has_equipas'
});

TipoServicosHasEquipas.belongsTo(tipoServicos, { foreignKey: 'tipo_servico_id' });
TipoServicosHasEquipas.belongsTo(equipas, { foreignKey: 'equipa_id' });

TipoServicosHasEquipas.sync({ force: false })
  .then(() => {
    //console.log('tipoServicos table created');
  })
  .catch((error) => {
    console.error('Error creating tipoServicos table:', error);
  });

export default TipoServicosHasEquipas;