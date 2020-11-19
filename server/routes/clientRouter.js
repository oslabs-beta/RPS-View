/**
 * ************************************
 *
 * @module  channelReducer
 * @author Mark, Joe
 * @date 11/18
 * @description reducer for market data
 *
 * ************************************
 */
const express =require('express')
const router = express.Router();
const clientController = require('../controllers/clientController')


router.post('/addClient', clientController.addClient, (req,res) => {
  res.status(200).send('got to addClient')
})

router.post('/unsubscribe', clientController.unsubscribe, (req,res) => {
  res.status(200).send('got to unsub')
})

router.post('/subscribe', clientController.subscribe, (req,res) => {
  res.status(200).send('got to sub')
})

router.post('/publish', clientController.publish, (req,res) => {
  res.status(200).send('got to publish')
})


module.exports = router; 