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

  /**
 * @openapi
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         usuario_id: 
 *           type: integer
 *           example: 1
 *         nombres:
 *           type: string
 *           example: Armando Casas
 *         age:
 *            type: integer
 *            example: 20
 *         height:
 *            type: decimal
 *            example: 20.1
 *         telefono:
 *            type: string
 *            example: 601-222-3333
 *         pass:
 *            type: string
 *            example: fdsafgfg434sdfdsfdsfdsf
 *         estado_usuario:
 *           type: string
 *           example: ACTIVO
 *         fecha_creacion: 
 *           type: datetime
 *           example: 2023-01-16T13:59:40.397Z
 *         fecha_actualizacion: 
 *           type: datetime
 *           example: 2023-01-16T13:59:40.397Z  
 */
