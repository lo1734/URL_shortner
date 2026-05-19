const prisma = require('../db/prisma');
const encoded62 = require('../utils/base62')

async function createShortUrl(originalUrl){
    const urlEntry = await prisma.url.create({
        data: {
            originalUrl : originalUrl,
            shortCode: '',
        },
    });

    const shortCode = encoded62(urlEntry.id);

    const updatedEntry = await prisma.url.update({
        where : {
            id : urlEntry.id,
        },
        data: {
            shortCode,
        },
    });
    return updatedEntry;
}

async function getOriginalUrl(shortCode){
      return prisma.url.findUnique({
            where : {
                shortCode,
            }
      });
}

module.exports = {
    createShortUrl,
    getOriginalUrl,
};

