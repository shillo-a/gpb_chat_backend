import express, { urlencoded, json } from 'express';
import cors from 'cors';
import { HttpError, ValidationError } from './errors/Errors.js';
import { sequelize } from './database/db.config.js';
import initModels from './models/init-models.js';

import userApi from './components/user/user.api.js';
import messageApi from './components/message/message.api.js';


const app = express();
const PORT = process.env.PORT;

// CORS - Разрешены любые запросы
app.use(cors())

// Все req.body перводим в json
app.use(urlencoded({extended: true})); 
app.use(json());
app.set('json spaces', 2);

// Подключение api routes
app.use('/api', [
    userApi,
    messageApi,

])

//Если задан некорректный url, возвращаем ошибку 404
app.use((req, res, next) => {
    const err = new HttpError(404)
    next(err)
})

// Ловим все ошибки в приложении, переданные из next(err)
// Express Error-handling middleware
app.use((err, req, res, next) => {

    //Только для режимма: Development
    console.log(err)

    if(err instanceof HttpError){
        res.status(err.status).json(err.message);
        return;
    }

    if(err instanceof ValidationError){
        res.status(422).json({message: err.message, remarks: err.remarks});
        return
    }

    //Если ошибка не ожидаемая, но не хотим, чтобы падал сервер
    res.status(500).json('500: Internal Server Error')
    
})

//Подключаем модели к sequelize
//Используем метод DB-First, по этой причине синхронизируем со стороны БД
initModels(sequelize);

// Запуск сервера
app.listen(PORT, ()=>{
    console.log(`Server started! Listening on port: ${PORT}`)
});