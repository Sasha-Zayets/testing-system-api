const { Router } = require('express');
const router = Router();
const { addTest, allTest, removeTest } = require('../controllers/TestsController');

router.post('/add-test', addTest);
router.post('/all-test', allTest);
router.post('/remove-test', removeTest);

module.exports = router;