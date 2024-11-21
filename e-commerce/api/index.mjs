import { createRequire } from 'module'
import {
    SecretsManagerClient,
    GetSecretValueCommand,
  } from "@aws-sdk/client-secrets-manager";
const require = createRequire(import.meta.url);
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const cors  = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer")
//const authRoutes = require("./routes/auth.mjs");
import authRoutes from "./routes/auth.mjs"
import { verifyToken, isAdmin } from './middleware/auth-middleware.mjs'
const AWS = require('aws-sdk');
const dotenv = require('dotenv');
require ('dotenv').config()

dotenv.config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
    region: process.env.AWS_REGION,
});

const secret_name = "DB_URL";
  
const client = new SecretsManagerClient({
  region: "us-east-1",
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId:"DB_URL",
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    })
  );
} catch (error) {
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  throw error;
}

let jwt_response;
try {
  jwt_response = await client.send(
    new GetSecretValueCommand({
      SecretId:"JWT_SECRET",
      VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
    })
  );
} catch (error) {
  // For a list of exceptions thrown, see
  // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
  throw error;
}

const db_secret = JSON.parse(response.SecretString);
const jwt_secret = JSON.parse(jwt_response.SecretString);
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Server running")
});

app.use("/product", verifyToken, isAdmin, productRoutes)
app.use("/category", verifyToken, isAdmin,categoryRoutes);
app.use("/brand", verifyToken, isAdmin,brandRoutes);
app.use("/customer", verifyToken, customerRoutes);
app.use("/auth",authRoutes);

async function connectDb(){
    mongoose.connect(db_secret.DB_URL)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error conectando a MongoDB', err));
}
app.listen(PORT, ()=>{
    console.log('App is running on port: ', PORT)
    connectDb();
});

export { jwt_secret };