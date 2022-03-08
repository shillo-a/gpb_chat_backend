import { patchUserShowMessagesFromDal, signinDal } from "./user.dal.js";

// 1.
export const signinService = async (userKey) => {
    const createdUser = await signinDal(userKey);
    return createdUser;
}

// 2.
export const patchUserShowMessagesFromService = async (userKey) => {
    const updatedUser = await patchUserShowMessagesFromDal(userKey);
    return updatedUser;
}
