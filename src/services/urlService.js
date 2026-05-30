const prisma = require('../db/prisma');
const encoded62 = require('../utils/base62')


async function createShortUrl(originalUrl, customAlias, expiresAt, userId){
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
                    userId,
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
                userId,
           },
        });
    }
    const existing = await prisma.url.findFirst({
        where:{
            originalUrl,
            userId,
        }
    });
    if(existing){
        console.log(existing);
        return existing;
    }
    const urlEntry = await prisma.url.create({
        data:{
            originalUrl,
            shortCode: '',
            expiresAt: expiresAt? new Date(expiresAt): null,
            userId,
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

