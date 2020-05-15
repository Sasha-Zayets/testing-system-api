const { Router } = require('express');
const router = Router();
const { 
        addTest, 
        allTest, 
        removeTest, 
        getTest, 
        resultTest,
        getTestResults
    } = require('../controllers/TestsController');

router.post('/add-test', addTest);
router.post('/all-test', allTest);
router.post('/get-test', getTest);
router.delete('/remove-test', removeTest);
router.post('/result-test', resultTest);
router.get('/result-test/:id', getTestResults);

module.exports = router;