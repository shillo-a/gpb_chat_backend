import { getMessagesDal, postMessageDal } from "./message.dal.js";

// 1.
export const getMessagesService = async (userKey) => {
    const messages = await getMessagesDal(userKey);
    return messages;
}

// 2.
export const postMessageService = async (body, userKey) => {
    const createdMessage = await postMessageDal(body, userKey);
    return createdMessage;
}