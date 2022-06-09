// const express = require('express');
// const { default: mongoose } = require('mongoose');
// // const router = express.Router()
// const userSchema = require("../model/user");
// const User = new mongoose.model('User', userSchema);


const router = require("express").Router();

const {userRegister} = require("../config/auth");

// customer Registeration Route
router.post("/customer", async (req, res) => { 
    await userRegister(req.body, 'customer', res);
});

// Admin Registration Route

router.post("/admin", async (req, res) => { 
    await userRegister(req.body, 'admin', res);
    
});

// shopowner Registeration Route
router.post("/shopowner", async (req, res) => { 
    await userRegister(req.body, 'shopowner', res);
});

// Customer Profile

router.get('/customer-profile', async (req, res) => {
    
    
});
// ShopOwner Profile
router.get('/shopowner-profile', async (req, res) => {

});

// Admin Profile Route
router.get('/admin-profile', async (req, res) => {});




module.exports = router;