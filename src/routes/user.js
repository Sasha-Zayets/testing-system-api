const { Router } = require('express');
const router = Router();
const { updateSettins, getAllSettings } = require('../controllers/UserController');

router.put('/update-settings', updateSettins);
router.post('/all-settings', getAllSettings);

module.exports = router;