import { createRequire } from 'module'
const require = createRequire(import.meta.url);
const express = require("express");
//const { registerUser, loginUser } = require("../handlers/auth-handler.mjs");
import { registerUser, loginUser } from "../handlers/auth-handler.mjs"
const router = express.Router();

router.post("/register", async (req,res) => {
    let model = req.body;
    if(model.name && model.email && model.password){
        await registerUser(model);
        res.send({
            message:"User registered"
        });
    }else{
        res.status(400).json({
            error: "Please provide name, email and password",
        });
    }

});

router.post("/login", async (req,res) => {
    let model = req.body;
    if(model.email && model.password){
        const result = await loginUser(model);
        if(result){
            res.setHeader('content-type', 'text/plain');
            res.send(JSON.stringify(result));
        }else{
            res.status(400).json({
                error: "Email or password is incorrect",
            });
        }
    }else{
        res.status(400).json({
            error: "Please provide email and password",
        });
    }

});

export default router;