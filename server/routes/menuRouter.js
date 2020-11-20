/**
 * ************************************
 *
 * @module  menuRouter
 * @author Mark, Joe
 * @date 11/18
 * @description adds routes for navMenu
 *
 * ************************************
 */

const express = require('express');
const router = express.Router();
const {menuController} = require('../controllers/menuController')

//router for connecting to redis db
router.post('/connect', menuController.connect, (req, res) => {
    res.status(200).send(res.locals.message);
})

//router for adding a channel to redis db
router.post('/addChannel', menuController.addChannel, (req, res) => {
    res.status(200).send(res.locals.message);
})

//router for adding client to redis db
router.post('/addClient', menuController.addClient, (req,res) => {
    console.log('made it to addclient', req.body)
    res.status(200).send(res.locals.message)
  })

//router for testing number of channels *NOT NEEDED FOR PRODUCTION*
router.post('/test', menuController.test, (req, res) => {
    res.status(200).send(res.locals.message);
})

module.exports = router;