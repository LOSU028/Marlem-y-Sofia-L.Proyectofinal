const express = require("express");
const router = express.Router();
const { addBrand, getBrand, updateBrand, deleteBrand, getBrands } = require("../handlers/brand-handler");

router.post("", async (req,res) => {
    let model = req.body;
    let result = await addBrand(model);
    res.setHeader('content-type', 'text/plain');
    res.send(JSON.stringify({result}));
})


router.get("", async (req,res) => {
    let result = await getBrands();
    res.send(result);
})

router.get("/:id", async (req,res) => {
    let id = req.params['id'];
    let result = await getBrand(id);
    res.setHeader('content-type', 'text/plain');
    res.send(JSON.stringify({result}));
})

router.put("/:id", async (req,res) => {
    let model = req.body;
    let id = req.params['id'];
    await updateBrand(id,model);
    res.send({ message: "updated"});
})

router.delete("/:id", async (req,res) => {
    let id = req.params['id'];
    await deleteBrand(id);
    res.send({message: "deleted"})
})


module.exports = router;

