const {
    createShortUrl,
    getOriginalUrl,
} = require('../services/urlService');

const validator = require('validator');

async function shortenUrl(req,res){
    try{
        const { url, customAlias, expiresAt } = req.body;
        if(!url||!validator.isURL(url)){
            return res.status(400).json({
                error: 'Valid URL is required.',
            })
        }

        const result = await createShortUrl(url, customAlias, expiresAt);

        return res.status(201).json({
            shortUrl: `${process.env.BASE_URL}/${result.shortCode}`,
            shortCode: result.shortCode,
            OriginalUrl: result.originalUrl,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            error: 'Internal Server Error',
        });
    }
}


async function redirectUrl(req, res){
        try{
            const { code } = req.params;
            const urlEntry = await getOriginalUrl(code);

            if(!urlEntry){
                return res.status(404).json({
                    error: 'Short url not found.'
                });
            }

            if(urlEntry.expiresAt && new Date() > new Date(expiresAt)){
                return res.status(410).json({
                    error: 'Short url expired!',
                });
            }

            return res.redirect(302, urlEntry.originalUrl);
        }catch(error){
            console.error(error);

            return res.status(500).json({
                error:'Internal server error.'
            });
        }
 }

module.exports = {
    shortenUrl,
    redirectUrl,
};

