import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class Message extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author_key: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: 'user',
        key: 'key'
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'message',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });
  }
}
