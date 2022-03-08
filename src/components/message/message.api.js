import { Router } from 'express';
import { 
    getMessagesContoller, 
    getNewMessagesConnectionController, 
    postMessageController 
} from './message.controller.js';

const router = Router();

// 1. GET ALL MESSAGES - AUTHORIZED (НЕ БЕЗОПАСНАЯ ПРОВЕРКА!)
router.get('/messages', getMessagesContoller);

// 2. POST MESSAGE - AUTHORIZED (НЕ БЕЗОПАСНАЯ ПРОВЕРКА!)
router.post('/messages', postMessageController);

// 3. GET NEW MESSAGE (LONG POLING SUBSCRIPTION) - AUTHORIZED (НЕ БЕЗОПАСНАЯ ПРОВЕРКА!)
router.get('/messages-connection', getNewMessagesConnectionController)

export default router;