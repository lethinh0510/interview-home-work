const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.checkAuth = (req, res, next) => {
    getAuth(req, (err, user)=>{
        if(err){
            return res.status(401).json({
                message: "Auth failed"
            });
        }else{
            req.user = user;
            next();
        }
    });
    
};
exports.getAuth = (req, res, next)=>{
    getAuth(req, (err, user)=>{
        if(err){
            next();
        }else{
            req.user = user;
            next();
        }
    });
}
function getAuth(req, callback){
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
            if (err) {
                callback(err);
            }
            callback(null, decoded);
        });
    } catch (error) {
        callback(error);
    }
}