const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

//@route GET api/transactions/balance/
//@desc get user's balance
//@access private 
router.get("/balance", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(user.money);
        res.json({money:user.money});
    } catch (error) {
        res.status(500).send("Server Error");
    }
});

//@route POST api/transactions/deposit/
//@desc increase money amount
//@access private

router.post("/deposit",[auth, [check("amount", "Amount is required").not().isEmpty()]],
async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id);
        const newBalance = parseInt(user.money,10) + parseInt(req.body.amount,10);
        await User.findByIdAndUpdate(req.user.id, {money:newBalance})
        res.json({money:newBalance});
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//@route POST api/transactions/withdrawal/
//@desc decrease money amount
//@access private

router.post("/withdraw",[auth, [check("amount", "Amount is required").not().isEmpty()]],
async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id);
        const newBalance = parseInt(user.money,10) - parseInt(req.body.amount,10);
        await User.findByIdAndUpdate(req.user.id, {money:newBalance})
        res.json({money:newBalance});
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

//@route POST api/transactions/transfer/
//@desc transfer money to specified user, check if email exist;
//@access private

router.post("/transfer",[auth, [check("amount", "Amount is required").not().isEmpty(), check("email", "Email is required").not().isEmpty()]],
async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const mainUser = await User.findById(req.user.id);
        const transferUser = await User.findOne({email:req.body.email})
        const mainBalance = parseInt(mainUser.money,10) - parseInt(req.body.amount,10);
        const transferBalance = parseInt(transferUser.money,10) + parseInt(req.body.amount,10);
        await User.findByIdAndUpdate(req.user.id, {money:mainBalance});
        await User.findByIdAndUpdate(transferUser.id, {money:transferBalance});
        res.json({money:mainBalance});
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});

module.exports = router;