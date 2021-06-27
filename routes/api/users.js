const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
//@route  POST api/users
//@desc   register user
//@access Public

router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, lastName, email, password, pesel } = req.body;
    const userType = "user";
    const money = 0;
    try {
      let user = await User.findOne({ email });
      //see if user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }
      

      user = new User({
        name,
        lastName,
        pesel,
        email,
        password,
        money,
        userType,
      });
      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //return jwt
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
  }
);

//@route  POST api/users/update
//@desc   update user
//@access Private
//email name lastname pesel
router.post("/update",[auth, [check("email", "Email is required").not().isEmpty()]],
async (req, res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const mainUser = await User.findById(req.user.id);
        console.log(mainUser);
          const updateUser = await User.findOne({email:req.body.email});
            if(!updateUser){
              return res.status(404).json({ msg: "User not found" });
            }
          console.log(updateUser);
          await User.findByIdAndUpdate(updateUser.id, {name:req.body.name, lastName:req.body.lastName, pesel:req.body.pesel});
          const updatedUser = await User.findOne({email:req.body.email});
        res.json(updatedUser);
    } catch (error) {
        console.error(err.message);
        res.status(500).send("server Error");
    }
});


module.exports = router;
