import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class User extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    key: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    show_messages_from: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at',
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: "sqlite_autoindex_user_1",
        unique: true,
        fields: [
          { name: "key" },
        ]
      },
    ]
  });
  }
}
