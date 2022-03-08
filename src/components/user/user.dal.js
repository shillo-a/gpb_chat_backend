import User from "../../models/User.js";
import { sequelize } from '../../database/db.config.js';

const getCurrentTimestamp = () => {
    return (new Date()).toISOString()
}
// sequelize.literal('CURRENT_TIMESTAMP') 

// 1.
export const signinDal = async (userKey) => {

    let signinUser;

    // 1. Проверям, существует ли пользователь
    signinUser = await User.findOne({
        where: {
            key: userKey
        }
        
    })

    // 2. Если не сущетвует создаем нового
    if(!signinUser){
        signinUser = await User.create({
            key: userKey,
            show_messages_from: getCurrentTimestamp()
        })
    }

    return signinUser;

}

// 2.
export const patchUserShowMessagesFromDal = async (userKey) => {

    
    
    const updatedUser = await User.update(
        { show_messages_from: getCurrentTimestamp() },
        {
            where: { key: userKey }
        }
    )

    return updatedUser;
}
