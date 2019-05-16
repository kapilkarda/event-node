const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {userAuthenticator} = require('../middlewares/authenticator');

const {register, login, fetchSingle, update, userRegisterMidlleware} = require('./auth');

const {create, fetch, fetchSingleEvent,filterEvent} = require('./event');


//User routes
router.post('/auth/register', [userRegisterMidlleware], register);
router.post('/auth/login', login);
router.get('/user',[userAuthenticator], fetchSingle);
router.put('/user',[userAuthenticator], update);

//Event routes
router.post('/event', create);
router.get('/event',  fetch);
router.get('/event/filter',  filterEvent);
router.get('/event/:eventId', fetchSingleEvent);

module.exports  = router;