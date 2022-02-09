const express = require("express");
const { Router } = express;
const router = Router();
const Api = require("../api/api_array.js");
const api = new Api.ApiMethods();

router.get("/",(req, res) => {
    let ans = api.getProducts();
    res.status(ans.status).json(ans.content);
});

router.get("/:id", (req,res) => {
        let ans = api.getProductById(req.params.id);
        res.status(ans.status).json(ans.content);
});

router.post("/", (req,res) => {
    let ans = api.addNewProduct(req.body);
    req.app.io.sockets.emit("renderProducts", api.getProducts().content);
    res.status(ans.status).json(ans.content);
});

router.put("/:id", (req,res) => {
    let ans = api.updateProduct(req.params.id, req.body);
    res.status(ans.status).json(ans.content);
});

router.delete("/:id", (req,res) => {
        let ans = api.delProductById(req.params.id);
        res.status(ans.status).json(ans.content);
});

module.exports.router_products = router;
module.exports.products = api;