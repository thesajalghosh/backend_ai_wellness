const express =  require('express');
const admin_router = new express.Router();
const bodyParser = require('body-parser');

admin_router.use(bodyParser.json())
admin_router.use(bodyParser.urlencoded({extended:true}));

const adminController = require('../controllers/admin');
admin_router.get('/admin/:category_type/filter/:filter_by_time',adminController.getNomineesByTimeBasis);
admin_router.get('/admin/:category_type/nominee/:nominee_name',adminController.getNomineeDetailsByName); // ok
admin_router.get('/admin/:category_type/:nominee_name/users',adminController.getUserVotingData);
admin_router.get('/admin/:category_type/:nominee_name',adminController.getAllVoterList); // ok
admin_router.get('/admin/:category_type',adminController.getNomineeByType); // ok

module.exports = admin_router;

