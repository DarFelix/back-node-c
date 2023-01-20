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

  /**
 * @openapi
 * components:
 *   schemas:
 *     Cita:
 *       type: object
 *       properties:
 *         cita_id: 
 *           type: integer
 *           example: 1
 *         fecha_cita: 
 *           type: datetime
 *           example: 2023-01-16T13:59:40.397Z  
 *         especialidad:
 *           type: string
 *           example: MEDICINA GENERAL
 *         usuario:
 *            type: object
 *            $ref: '#/components/schemas/Usuario'
 *         fecha_creacion: 
 *           type: datetime
 *           example: 2023-01-16T13:59:40.397Z
 *         fecha_actualizacion: 
 *           type: datetime
 *           example: 2023-01-16T13:59:40.397Z  
 */
