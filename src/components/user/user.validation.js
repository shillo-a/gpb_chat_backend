import validator from 'validator';
import { ValidationError } from '../../errors/Errors.js';
import { CustomValidators } from '../../validators/customValidators.js';

export const signinValidation = async (sanitizedUserKey) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    if(validator.isLength(sanitizedUserKey, { min: 3, max: 25 }) !== true){
        remarks.push( {type: 'userKey', message: 'Не меньше 3 и не больше 25 символов'} )
    }

    if(validator.isAlphanumeric(sanitizedUserKey) !== true){
        remarks.push( {type: 'userKey', message: 'Только буквы (A-Z a-z) и цифры (0-9)'} )
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}
