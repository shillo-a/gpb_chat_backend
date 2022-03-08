import { httpStatuses } from './httpStatuses.js'

//Создаём иерархию ошибок
//Ошибки относительно запросов http
export class HttpError extends Error {

    constructor(status, message = null){
        super(
            message || `${status}: ${httpStatuses.find(item => item.status === status).name}`
        );
        this.status = status;
    }

}

//Ошибки относительно валидации
export class ValidationError extends Error {
    constructor(remarks = []){
        super('Validation error');
        this.remarks = remarks;
    }
}

// HttpError
// DbError
// NotFoundError
// ValidationError etc

// failed to connect to server
// failed to resolve hostname
// invalid user input
// request timeout
// server returned a 500 response
// socket hang-up
// system is out of memory