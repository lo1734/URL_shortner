const express = require('express');
const router = express.Router()
const authenticate = require('../auth/authMiddleware')

const {
    shortenUrl,
    redirectUrl,
    getUrls,
} = require('../controllers/urlController');

router.post('/shorten',
    authenticate,
    shortenUrl
);
router.get('/:code', redirectUrl);
router.get('/urls',
    authenticate,
    getUrls,
)

module.exports = router;