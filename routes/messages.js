const router = require('express').Router();
const {index, create, destroy, update} = require('../controllers/MessageController');

router.get('/:id', index);
router.post('/', create);
router.delete('/:id',destroy);
router.put('/:id',update);

module.exports = router;
