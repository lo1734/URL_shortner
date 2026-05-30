const axios = require('axios');

async function verifyCaptcha(req, res, next) {
    try {
        const secretKey = process.env.RECAPTCHA_SECRET_KEY;

        // Dev mode helper: if secret key is not set, allow requests to pass
        if (!secretKey || secretKey === 'your_recaptcha_secret_key_here') {
            console.warn('⚠️  reCAPTCHA secret key is not configured. Skipping CAPTCHA verification in dev mode.');
            return next();
        }

        const { captchaToken } = req.body;

        if (!captchaToken) {
            return res.status(400).json({
                error: 'CAPTCHA token is required.',
            });
        }

        // Verify with Google
        const response = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: secretKey,
                    response: captchaToken,
                    remoteip: req.ip,
                },
            }
        );

        const { success, score } = response.data;

        if (!success) {
            return res.status(400).json({
                error: 'CAPTCHA verification failed. Please try again.',
            });
        }

        next();
    } catch (error) {
        console.error('CAPTCHA verification error:', error.message);
        return res.status(500).json({
            error: 'Internal server error during CAPTCHA verification.',
        });
    }
}

module.exports = verifyCaptcha;
