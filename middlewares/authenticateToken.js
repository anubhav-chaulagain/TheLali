const jwt = require('jsonwebtoken');
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    console.log("Token: int mmidlleware: ", token);
    

    if(token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userData) => {
        if(err) return res.sendStatus(403);
        req.userData = userData;
        next();
    });
}

module.exports = authenticateToken;