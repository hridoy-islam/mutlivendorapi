const express = require('express');
const router = express.Router();
const {userLogin} = require("../config/auth");


// Customer Login
router.post('/customer', async(req, res) => {
    await userLogin(req.body, 'customer', res);
});

//Admin Login Route
router.post("/admin", async (req, res) => { 
    await userLogin(req.body, 'admin', res);
});

// ShopOwner Login Route
router.post("/shopowner", async (req, res) => { 
    await userLogin(req.body, 'shopowner', res);
});

module.exports = router;