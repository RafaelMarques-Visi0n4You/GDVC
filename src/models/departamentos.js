import { sequelize } from '../config/sequelize.js';
import { DataTypes } from 'sequelize';

const Departamento = sequelize.define('departamentos', {
  departamento_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'empresas',
      key: 'empresa_id'
    }
  },
  nome: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'departamentos'
});

Departamento.sync()
  .then(() => {
    // console.log('Departamento table created');
  })
  .catch((error) => {
    console.error('Error creating Departamento table:', error);
  });

export default Departamento;