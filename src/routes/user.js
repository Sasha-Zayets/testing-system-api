const { Router } = require('express');
const router = Router();
const { updateSettins } = require('../controllers/UserController');

router.put('/update-settings', updateSettins);

module.exports = router;