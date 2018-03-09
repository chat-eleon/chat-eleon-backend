var express = require('express');
var router = express.Router();
var Groups = require('../controllers/GroupController')

/* GET users listing. */
router.get('/',Groups.viewGroup)
router.post('/',Groups.addGroups)
router.post('/',Groups.updateGroups)
router.delete('/',Groups.deleteGroups)
module.exports = router;
