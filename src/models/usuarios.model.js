module.exports = (sequelize, DataTypes) => {
    
    const User = sequelize.define('user', {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey : true,
      },
      nombres: {
        type: DataTypes.STRING,
        allowNull: true
      },
      numero_doc: {
        type: DataTypes.STRING  ,
        allowNull: true
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      height: {
        type: DataTypes.DECIMAL,
        allowNull: true
      },
      telefono: {
        type: DataTypes.STRING,
        allowNull: true
      },
      pass: {
        type: DataTypes.STRING,
        allowNull: true
      },
      estado_usuario: {
        type: DataTypes.STRING,
        allowNull: true
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true
      },
      fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: true
      }

    },{
      tableName: 'usuarios',
      timestamps: false
    });

    return User

  };