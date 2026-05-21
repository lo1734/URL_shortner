function errorhandler(err,req,res,next){
       console.error(err);

       return res.status(500).json({
            error: err.message || 'Internal Server Error.',
       });
}

module.exports = errorhandler;