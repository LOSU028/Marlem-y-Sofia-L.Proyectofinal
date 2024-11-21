import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const jwt = require("jsonwebtoken");

import { jwt_secret } from "../index.mjs";

function verifyToken(req,res,next){
    const token = req.header('Authorization');
    if (!token){
        return res.status(401).send({
            error:"Acces denied",
        });
    }
    try{
        const decode = jwt.verify(token, jwt_secret.JWT_SECRET);
        req.user = decode;
        next();
    }catch(err){
        return res.status(401).send({
            error: "Invalid token"
        });
    }
}

function isAdmin(req, res,next){
    console.log(req.user);
    if(req.user && req.user.isAdmin){
        next();
    }else{
        return res.status(403).send({
            error:"Forbidden"
        })
    }
}

export { verifyToken, isAdmin }