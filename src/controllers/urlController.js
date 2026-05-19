const {
    createShortUrl,
    getOriginalUrl,
} = require('../services/urlService')

async function shortenUrl(req,res){
    try{
        const { url } = req.body;
        if(!url){
            return res.status(400).json({
                error: 'URL is required.',
            })
        }

        const result = await createShortUrl(url);
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

