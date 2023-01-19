module.exports = (sequelize, DataTypes) => {
    
    const Cita = sequelize.define('cita', {
      cita_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey : true
      },
      fecha_cita: {
        type: DataTypes.DATE,
        allowNull: true
      },
      especialidad: {
        type: DataTypes.STRING  ,
        allowNull: true
      },
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true
      },
      fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: true
      },

    },{
        tableName: 'citas',
        timestamps: false
    });

    return Cita

  };