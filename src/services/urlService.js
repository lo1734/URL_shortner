const prisma = require('../db/prisma');
const encoded62 = require('../utils/base62')


async function createShortUrl(originalUrl, customAlias){
    if(customAlias){
        const existing = await prisma.url.findUnique({
           where: {
                shortCode: customAlias,
           },
        });

        if(existing){
            throw new Error('Custom alias already exists!');
        }

        const existingUrl = await prisma.url.findFirst({
               where: {
                    originalUrl,
               },
        });

        if(existingUrl && !customAlias){
             return existingUrl;
        }

        return prisma.url.create({
           data: {
                originalUrl,
                shortCode: customAlias,
                expiresAt: expiresAt ? new Date(expiresAt) : null,
           },
        });
    }
    const urlEntry = await prisma.url.create({
        data:{
            originalUrl,
            shortCode: '',
        },
    });

     const shortCode = encoded62(urlEntry.id);

     return prisma.url.update({
        where: {
            id: urlEntry.id,
        },
        data: {
            shortCode,
        },
     });
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

