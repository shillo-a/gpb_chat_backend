import validator from 'validator';
import { ValidationError } from '../../errors/Errors.js';
import { CustomValidators } from '../../validators/customValidators.js';

export const postMessageValidation = async (body, userKey) => {
    
    let remarks = [];

    // Выполняем проверку целиком по APIы

    // Message is empty
    if(validator.isEmpty(body) === true){
        remarks.push( {type: 'message', message: 'Сообщение пустое'} )
    }

    // User exists
    if(await CustomValidators.isUserExists(userKey) !== true){
        remarks.push( {type: 'user', message: "Такого пользователя нет или он удален"} );
    }

    //Отражаем все ошибки по API
    if(remarks.length > 0){
        throw new ValidationError(remarks)
    } 

}
