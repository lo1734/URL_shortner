const jwt = require('jsonwebtoken')
function authenticate(req,res,next){
    try{
        const auth_Header = req.headers.authorization;
        if(!auth_Header){
            return res.status(401).json({
                error:'Authorization token is Missing.',
            });
        }
        const token = auth_Header.split(' ')[1];
        if(!token){
            return res.status(401).json({
                error:'Invalid Token format',
            });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user = decoded;

        next();

    }catch(error){
        return res.status(401).json({
            error:'Invalid or Expired token',
        });
    }
}

module.exports = authenticate;