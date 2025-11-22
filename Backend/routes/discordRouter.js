const { Router } = require("express");
const discordController = require("../controllers/discordController.js");
const discordRouter = Router();
const passport = require("passport");
const path = require("path");
const { check, validationResult } = require("express-validator");

discordRouter.post(
  "/signUp",
  [
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    check("password")
      .matches(/\d/)
      .withMessage("Password must contain at least one number"),
    check("password")
      .matches(/[!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?]/)
      .withMessage("Password must contain at least one special character"),
    check("username")
      .isLength({ min: 4 })
      .withMessage("Username must be at least 4 chracters long"),
    check("passwordConfirm").custom((passwordConfirm, { req }) => {
      if (passwordConfirm !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), old: req.body });
    }
    next();
  },
  discordController.signUp
);

discordRouter.get("/setUser", discordController.setUser);

discordRouter.post(
  "/login",
  passport.authenticate("local"),
  function (req, res) {
    res.json({ user: req.user });
  }
);

discordRouter.post("/logout", discordController.logOut);

//// Anything but account stuff

discordRouter.get("/getUsers", discordController.getUsers);

discordRouter.get("/getChats", discordController.getChats);

module.exports = discordRouter;
