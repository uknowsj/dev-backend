const jwt = require('jsonwebtoken');
const util = {
    createToken: (request, res) => {
        const payload = {
            id: new Date().toLocaleString,
            name: 'test-server',
        }
    
        const jwtOpts = {
            expiresIn: process.env.TOKEN_LIFE
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, jwtOpts);

        res.clearCookie("token");
        res.cookie("token",  token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: true,
        //   secure: true,
          secure: false,
          signed: true,
        //   sameSite:'None'
        })
    },
    checkToken: async (request, res) => {
        try {
            let token = request.signedCookies.token;
            console.log("request header", request.headers);
            console.log("encoded token", token);
            let result = await module.exports.decodeToken(token, false);
            console.log("decoded token", result);
        } catch (err) {
            console.log("DECODE TOKEN ERR", err);
        }
    },
    decodeToken: (token, isRefresh) => new Promise((resolve, reject) => {
        jwt.verify(token, isRefresh ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            resolve('EXPIRE');
          }
          else resolve(decoded)
        })
    }),
}

module.exports = util;
