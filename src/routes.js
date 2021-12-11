var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const verifyToken=require('../tokenVerification/VerifyToken');
const {getDetails,insertWalletId,getToken}=require('./index');
console.log(getDetails)
router.route('/getToken').post(getToken);
router.route('/getDetails').get(verifyToken,getDetails);
router.route('/insertWalletId').post(verifyToken,insertWalletId);
module.exports = router;