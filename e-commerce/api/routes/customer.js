const express = require("express");
const { getNewProducts, getFeaturedProducts, getProduct } = require("../handlers/product-handler");
const { getCategories } = require("../handlers/category-handler");
const router = express.Router();

router.get("/new-products", async (req,res) => {
    const products = await getNewProducts();
    res.send(products);
})

router.get("/featured-products", async (req,res)=>{
    const products = await getFeaturedProducts();
    res.send(products);
})

router.get("/categories", async (req,res)=>{
    const categories = await getCategories();
    res.send(categories);
})

router.get("/product/:id", async (req, res) => {
    const id = req.params["id"];
    const product = await getProduct(id);
    res.setHeader('content-type', 'text/plain');
    res.send(JSON.stringify({product}));
})
module.exports = router;