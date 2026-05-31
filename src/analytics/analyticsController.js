const prisma = require('../db/prisma');

async function getAnalytics(req,res){
      try{
        const { code } = req.params;
        const totalClicks = await prisma.clickEvent.count({
            where:{
                shortCode: code,
            },
        });
        const clicks = await prisma.clickEvent.findMany({
            where:{
                shortCode: code,
            },
            orderBy:{
                clickedAt: 'desc',
            },
            take: 20,
        });
        return res.json({
           totalClicks,
           recentClicks: clicks,
        });
      }catch(error){
           return res.status(500).json({
                error: 'Internal Server Error',
           });
      }
}

module.exports = {
    getAnalytics,
};