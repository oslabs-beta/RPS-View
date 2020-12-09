/**
 * ************************************
 *
 * @module  clientRouter
 * @author Mark, Joe
 * @date 11/18
 * @description router for client menu 
 *
 * ************************************
 */
const express =require('express')
const router = express.Router();
const clientController = require('../controllers/clientController')

//router for client unsub
router.post('/unsubscribe', clientController.unsubscribe)

//router for client sub
router.post('/subscribe', clientController.subscribe)

//router for client publish
router.post('/publish', clientController.publish)

router.post('/subscribeMany', clientController.subscribeMany)


module.exports = router; 
