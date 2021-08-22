const fs = require("fs");
const path = require("path");
const pathToKey = path.join(__dirname, "./", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
const jsonwebtoken = require("jsonwebtoken");

module.exports=  generateJWT = (user) => {
  const payload = {
    sub: user._id,
    iat: Date.now(),
  };
   const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
      expiresIn: "1d",
      algorithm: "RS256",
    });
  return {
    token: "Bearer " + signedToken,
    expires: "1d",
  };
};

