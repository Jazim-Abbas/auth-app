const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const e = require("express");
const env = require("dotenv").config();
const { sendMail, code } = require("../middlewares/sendEmail")

const googleLogin = async (req, res) => {
  const user = req.user._json

  models.VenueOwner.findOne({ where: { email: user.email } })
    .then(async (result) => {
      if (result) {
        res.status(201).json({
          message: "Successfully Logged in"
        })
      }
      else {
        const newVenueOwner = {
          name: user.name,
          email: user.email,
        }

        await models.VenueOwner.create(newVenueOwner)
          .then(result => {
            res.status(201).json({
              message: "Successfully Logged in"
            })
          })
          .catch(error => {
            res.status(500).json({
              message: "Something went wrong",
              newUser: error
            })
          })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Something went wrong",
        newUser: error
      })
    })
}

const register = (req, res) => {
  const body = req.body;
  const hash = bcrypt.hashSync(body.password, 10);

  models.VenueOwner.findOne({ where: { email: body.email } })
    .then((result) => {
      if (result) {
        res.status(500).json({
          message: "Email Exists",
        });
      } else {
        if (body.password === body.confirmPassword) {
          const newVenueOwner = {
            name: body.name,
            email: body.email,
            password: hash,
            familyName: body.familyName,
            phone: body.phone,
            venueName: body.venueName,
            streetNumber: body.streetNumber,
            streetName: body.streetName,
            town: body.town,
            postcode: body.postcode,
          };
          models.VenueOwner.create(newVenueOwner);
          res.status(200).json({
            message: "Successfully Registered",
          });
        } else {
          res.status(500).json({
            message: "Both Password don't matches",
          });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

const login = (req, res) => {
  const body = req.body;

  models.VenueOwner.findOne({ where: { email: body.email } })

    .then((result) => {
      if (result === null) {
        res.status(500).json({
          message: "Invalid Credentials",
        });
      } else {
        const matchedPassword = bcrypt.compareSync(
          body.password,
          result.password
        );
        if (matchedPassword) {
          const token = jwt.sign(
            {
              name: result.name,
              email: result.email,
              venueOwnerID: result.id,
            },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({
            message: "Auth Successfull.",
            token: token,
            name: result.name,
            email: result.email,
            venueOwnerID: result.id,
          });
        } else {
          res.status(500).json({
            message: "Invalid Credentials",
          });
        }
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong " + error,
        newUser: error,
      });
    });
};

const show = (req, res) => {
  console.log("user", req.user);

  models.VenueOwner.findOne({ where: { id: req.user.venueOwnerID } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          name: result.name,
          email: result.email,
          familyName: result.familyName,
          phone: result.phone,
          venueName: result.venueName,
          streetNumber: result.streetNumber,
          streetName: result.streetName,
          town: result.town,
          postcode: result.postcode,
        });
      } else {
        res.status(404).json({
          message: "Not Found",
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

const update = (req, res) => {
  const body = req.body;

  const updateVenueOwner = {
    venueName: body.venueName,
    streetNumber: body.streetNumber,
    streetName: body.streetName,
    town: body.town,
    postcode: body.postcode,
  };

  models.VenueOwner.update(
    { ...updateVenueOwner },
    { where: { id: req.user.venueOwnerID } }
  )
    .then((result) => {
      res.status(200).json({
        message: "Updated Successfully",
        VenueOwner: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong",
        VenueOwner: error,
      });
    });
};

const sendVerificationCode = (req, res) => {
  models.VenueOwner.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        sendMail(result.email, res)
        const updateVenueOwner = {
          verificationCode: code
        }
        models.VenueOwner.update(updateVenueOwner, { where: { email: req.body.email } })
      }
      else {
        res.status(404).json("User Not Found")
      }
    })
}

const forgetPassword = (req, res) => {
  models.VenueOwner.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result.verificationCode == req.body.verificationCode) {
        if (req.body.password === req.body.confirmPassword) {
          const hash = bcrypt.hashSync(req.body.password, 10);
          const updatePassword = {
            password: hash
          }
          models.VenueOwner.update(updatePassword, { where: { email: result.email } })
            .then(
              res.status(200).json("Successfully Updated Password")
            )
        }
        else {
          res.status(422).json("Both Password don't matches")
        }
      }
      else {
        res.status(400).json("Invalid Code")
      }
    })
    .catch((err) => {
      res.status(404).json("User Not Found")
    })
}

module.exports = {
  register: register,
  login: login,
  show: show,
  update: update,
  sendVerificationCode: sendVerificationCode,
  forgetPassword: forgetPassword,
  googleLogin: googleLogin
};
