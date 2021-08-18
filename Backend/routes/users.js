const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../modles/User");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res) => {
  res.send("usersLandingPag");
});
router.get("/login", (req, res) => {
  res.send("Login");
});
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password1, password2 } = req.body;
  const errors = [];
  //validate fields (server side or client side or both?)
  for (const item of Object.values(req.body)) {
    if (item === "" || item === undefined) {
      errors.push("Please fill all the fields");
    }
  }

  if (password1 !== password2) {
    errors.push("Passwords do no match");
  }
  if (password1.length < 6) {
    errors.push("Password length should be at least 6 characters");
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      firstName,
      lastName,
      email,
      password1,
      password2,
    });
  } else {
    const existsCheck = await User.findOne({ email: email });
    if (existsCheck) {
      //email is taken
      res.send("email is taken");
    } else {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password1,
      });
      //Hash password
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          //Boilerplate with try catch
          const insert = await newUser.save();
          if (insert) {
            res.redirect("/login");
          } else {
            res.redirect("/register", { ...newUser, password: password1 });
          }
        });
      });
    }
  }

  // Login
  router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/dashboard",
      failureRedirect: "/users/login",
      failureFlash: true,
    })(req, res, next);
  });
});

// Login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true,
  })(req, res, next);
});

//logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect('/login')
});
module.exports = router;
