import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _Message from  "./Message.js";
import _User from  "./User.js";

export default function initModels(sequelize) {
  const Message = _Message.init(sequelize, DataTypes);
  const User = _User.init(sequelize, DataTypes);

  Message.belongsTo(User, { as: "author_key_user", foreignKey: "author_key"});
  User.hasMany(Message, { as: "messages", foreignKey: "author_key"});

  return {
    Message,
    User,
  };
}
