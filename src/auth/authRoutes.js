const express = require('express');
const router = express.Router();
const authenticate = require('./authMiddleware')

const{
    register,
    login,
} = require('./authController');

router.post('/register', register);
router.post('/login', login);
router.get(
    '/me',
    authenticate,
    async (req,res)=>{
        return res.json({
           user: req.user,
        });
    }
);

module.exports = router;
