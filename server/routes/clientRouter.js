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
router.post('/unsubscribe', clientController.unsubscribe, (req,res) => {
  res.status(200).send(res.locals.message)
})

//router for client sub
router.post('/subscribe', clientController.subscribe, (req,res) => {
  res.status(200).send(res.locals.message)
})

//router for client publish
router.post('/publish', clientController.publish, (req,res) => {
  res.status(200).send(res.locals.message)
})


module.exports = router; 
