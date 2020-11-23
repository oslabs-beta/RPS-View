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
router.post('/connect', menuController.connect)

//router for adding a channel to redis db
router.post('/addChannel', menuController.addChannel)

//router for adding client to redis db
router.post('/addClient', menuController.addClient)

//router for testing number of channels *NOT NEEDED FOR PRODUCTION*
router.post('/test', menuController.test, (req, res) => {
    res.status(200).send(res.locals.message);
})

module.exports = router;