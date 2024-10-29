const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const cors  = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");
const customerRoutes = require("./routes/customer")
const authRoutes = require("./routes/auth");
const { verifyToken, isAdmin } = require("./middleware/auth-middleware")

require ('dotenv').config()


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
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log('Conexión a MongoDB exitosa'))
    .catch((err) => console.error('Error conectando a MongoDB', err));
}
app.listen(PORT, ()=>{
    console.log('App is running on port: ', PORT)
    connectDb();
});