import { 
    getMessagesService, 
    postMessageService 
} from "./message.service.js";
import { postMessageValidation } from "./message.validation.js";

import { HttpError } from "../../errors/Errors.js";
import EventEmitter from 'events';

const emmitter = new EventEmitter();

// 1.
export const getMessagesContoller = async (req, res, next) => {

    const { userKey } = req.query;

    try {
        // санитизация не требуется
        // валидация не требуется (только проверка "авторизован" ли)
        const messages = await getMessagesService(userKey)
        if(!messages){
            throw new HttpError(400);
        }

        return res.status(200).json(messages);

    } catch(err) {
        next(err)
    }
    
}

// 2. 
export const postMessageController = async (req, res, next) => {

    const { body } = req.body;
    const { userKey } = req.query;

    try {
        // санитизация не требуется
        await postMessageValidation(body, userKey);
        const createdMessage = await postMessageService(body, userKey);

        if(!createdMessage){
            throw new HttpError(400);
        }
        
        // 1. triggering event for event sourcing
        emmitter.emit('postMessage', createdMessage);

        // 2. regular return
        return res.status(200).json(createdMessage);
        
    } catch(err){
        next(err)
    }

}

//3. 
export const getNewMessagesConnectionController = async (req, res, next) => {

   // event sourcing 

   res.writeHead(200, {
       'Connection': 'keep-alive',
       'Content-Type': 'text/event-stream',
       'Cache-Control': 'no-cache'
   })

   emmitter.on('postMessage', (createdMessage) => {
       res.write(`data: ${JSON.stringify(createdMessage)} \n\n`)
   })

}

//Options:
// 1. Long poling (emitter)
// 2. Event Sourcing (emitter)
// 3. WebSockets