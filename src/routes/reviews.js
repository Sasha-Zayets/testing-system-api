const { Router } = require('express');
const router = Router();
const { getAll, addReview } = require('../controllers/ReviewsController');

router.get('/all-reviews', getAll);
router.post('/add-review', addReview);

module.exports = router;