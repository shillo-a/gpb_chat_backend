import pkg from 'sequelize';
const { Op } = pkg;

import Message from '../../models/Message.js'
import User from '../../models/User.js';

// 1.
export const getMessagesDal = async (userKey) => {

    const user = await User.findOne({
        where: {key: userKey}
    })

    const showMessagesFrom = user.show_messages_from;

    const messages = await Message.findAll({
        order: [
            ['created_at', 'DESC'],
        ],
        where: {
            created_at: {
                [Op.gte]: showMessagesFrom
            }
        }
    });
    return messages;

}

// 2.
export const postMessageDal = async (body, userKey) => {

    const createdMessage = await Message.create({
        body: body, 
        author_key: userKey
    })

    return createdMessage;

}

// const now = (new Date()).toISOString();[Op.gte]: moment().subtract(7, 'days').toDate()