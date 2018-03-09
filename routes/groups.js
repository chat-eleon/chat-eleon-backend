var express = require('express');
var router = express.Router();
var Groups = require('../controllers/GroupController')

/* GET users listing. */
router.get('/',Groups.viewGroup)
router.post('/add',Groups.addGroups)
router.post('/update',Groups.updateGroups)
router.delete('/delete',Groups.deleteGroups)
module.exports = router;
