const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const router = express.Router();
const generateJWT = require("../config/utils/IssureJWT");

const buildResponse = (code, message) => {
  return JSON.stringify({
    type: code,
    message: message,
  });
};

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, password2 } = req.body;

    console.log(req.body);
    const errors = [];
    //validate fields (server side or client side or both?)
    for (const item of Object.values(req.body)) {
      if (item === "" || item === undefined) {
        errors.push("Please fill all the fields");
      }
    }

    if (password !== password2) {
      errors.push("Passwords do no match");
    }
    // if (password.length < 6) {
    //   errors.push("Password length should be at least 6 characters");
    // }

    if (errors.length > 0) {
      res.render("register", {
        errors,
        firstName,
        lastName,
        email,
        password1: password,
        password2,
      });
    } else {
      const existsCheck = await User.findOne({ email: email });
      if (existsCheck) {
        //email is taken
        res.send(buildResponse("400", "Email is already taken"));
      } else {
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        });
        //Hash password
        bcrypt.genSalt(10, async (err, salt) => {
          bcrypt.hash(newUser.password, salt, async (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            const insert = await newUser.save();
            if (insert) {
              const jwt = generateJWT(newUser);

              res.send(
                buildResponse("200", {
                  message: "Sucsess",
                  payload: {
                    user: newUser,
                    token: jwt.token,
                    expiresIn: jwt.expires,
                  },
                })
              );
            } else {
              res.send(
                buildResponse(
                  "500",
                  "Saving the user has failed,Please try again later."
                )
              );
            }
          });
        });
      }
    }
  } catch (e) {
    console.log("Error :" + e);
    res.send(buildResponse("500", e.message));
  }
});

// Auth --TODO Change to auth form the frontend aswell
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email: email }).then(async (user) => {
    if (!user) {
      res.send(buildResponse("404", "User name could not be found"));
    }
    //Compare hashed passwords Maybe shouldn't do it here?
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = generateJWT(user);
        res.send(buildResponse(200, token));
      } else {
        res.send(buildResponse("403", "Wrong password"));
      }
    });
  });
});

//logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
