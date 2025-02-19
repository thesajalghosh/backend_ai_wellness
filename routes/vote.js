const express =  require('express');
const vote_router = new express.Router();
const bodyParser = require('body-parser');

vote_router.use(bodyParser.json())
vote_router.use(bodyParser.urlencoded({extended:true}));

// Register Controller
const validateRequest = require('../middlewares/validateRequest');

const voteController = require('../controllers/vote');
const voteSchema = require('../validations/vote');
vote_router.post('/vote',validateRequest(voteSchema),voteController.createVote);

module.exports = vote_router;

