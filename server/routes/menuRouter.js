const express = require('express');
const router = express.Router();
const {menuController} = require('../controllers/menuController')

//set up router for menu here
router.post('/connect', menuController.connect, (req, res) => {
    res.status(200).send("menu connect");
})

router.post('/addChannel', menuController.addChannel, (req, res) => {
    res.status(200).send("add Channel");
})

router.post('/addClient', menuController.addClient, (req,res) => {
    res.status(200).send('got to addClient')
  })

router.post('/test', menuController.test, (req, res) => {
    res.status(200).send("test");
})

module.exports = router;