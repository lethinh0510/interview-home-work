const express = require('express');
const router = express.Router();

router.use('/posts', require('./post'));
router.use('/auth', require('./user'));
router.use('/comments', require('./comment'));

module.exports = router;