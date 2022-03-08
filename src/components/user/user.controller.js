import { signinSanitization } from "./user.sanitization.js";
import { patchUserShowMessagesFromService, signinService } from "./user.service.js";
import { signinValidation } from "./user.validation.js";

// 1.
export const signinController = async (req, res, next) => {

    const { userKey } = req.body;

    try {
        const { sanitizedUserKey } = signinSanitization(userKey);
        await signinValidation(sanitizedUserKey);
        const createdUser = await signinService(sanitizedUserKey);
   
        if(!createdUser){
            throw new HttpError(400);
        }

        return res.status(200).json(createdUser);

    } catch(err){
        next(err)
    }

}

// 2.
export const patchUserShowMessagesFromController = async (req, res, next) => {

    const { userKey } = req.query;

    try {
        // сантизация не требуется
        // валидация не требуется
        const updatedUser = await patchUserShowMessagesFromService(userKey);

        if(!updatedUser){
            throw new HttpError(400);
        }

        return res.status(200).json(updatedUser);

    } catch(err){
        next(err)
    }  

}