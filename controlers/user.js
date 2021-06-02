const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("dotenv").config();
const nodemailer = require('nodemailer');
const { sendMail, code } = require("../middlewares/sendEmail")

const register = (req, res) => {
  const body = req.body;
  const hash = bcrypt.hashSync(body.password, 10);

  models.User.findOne({ where: { email: body.email } })
    .then((result) => {
      if (result) {
        res.status(500).json({
          message: "Email Exists",
        });
      } else {
        if (body.password === body.confirmPassword) {
          const newUser = {
            name: body.name,
            email: body.email,
            password: hash,
            familyName: body.familyName,
            phone: body.phone,
          };
          models.User.create(newUser);
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

  models.User.findOne({ where: { email: body.email } })

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
              userID: result.id,
            },
            process.env.ACCESS_TOKEN_SECRET
          );
          res.json({
            message: "Auth Successfull.",
            token: token,
            name: result.name,
            email: result.email,
            userID: result.id,
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
  models.User.findOne({ where: { id: req.user.userID } })
    .then((result) => {
      if (result) {
        res.status(200).json({
          name: result.name,
          email: result.email,
          familyName: result.familyName,
          phone: result.phone,
        });
      } else {
        res.status(404).json({
          message: "Not Found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Something went wrong",
      });
    });
};

const update = (req, res) => {
  const body = req.body;

  const updateUser = {
    name: body.name,
    familyName: body.familyName,
    phone: body.phone,
  };

  if (body.password) {
    const hash = bcrypt.hashSync(body.password, 10);
    updateUser.password = hash;
  }

  console.log("query param", req.query);

  let model = models.User;
  let id;

  if (req.query && req.query.isOwner === "1") {
    model = models.VenueOwner;
    id = req.user.venueOwnerID;
  } else {
    id = req.user.userID;
  }

  model
    .update({ ...updateUser }, { where: { id } })
    .then((result) => {
      res.status(200).json({
        message: "Updated Successfully",
        user: result,
      });
    })
    .catch((error) => {
      console.log("error", error);
      res.status(500).json({
        message: "Something went wrong",
        user: error,
      });
    });
};

const sendVerificationCode = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
  try {
    sendMail(req.body.email, res)
    const updateUser = {
      verificationCode: code
    }
    models.User.update(updateUser, { where: { email: req.body.email } })
  }
  catch {
    (err) => {
      res.status(404).json("User Not Found")
    }
  }
}

const forgetPassword = (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result.verificationCode == req.body.verificationCode) {
        if (req.body.password === req.body.confirmPassword) {
          const hash = bcrypt.hashSync(req.body.password, 10);
          const updatePassword = {
            password: hash
          }
          models.User.update(updatePassword, { where: { email: result.email } })
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
  forgetPassword: forgetPassword
};

// const save = (req, res) => {
//     const body = req.body

//     const newUser = {
//         name: body.name,
//         email: body.email,
//         password: body.password
//     }
//     models.User.create(newUser)
//         .then(result => {
//             res.status(201).json({
//                 message: "Successfully Saved User",
//                 newUser: result
//             })
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Something went wrong",
//                 newUser: error
//             })
//         })
// }

// const show = (req, res) => {
//     const id = req.params.id

//     models.User.findByPk(id)
//         .then(result => {
//             if(result){
//                 res.json(result)
//             }
//             else {
//                 res.status(404).json({
//                     message: "Not Found"
//                 })
//             }
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Something went wrong"
//             })
//         })
// }

// const showAllUsers = (req, res) => {
//     models.User.findAll()
//         .then(result => {
//             if (result) {
//                 res.json(result)
//             }
//             else {
//                 res.status(404).json({
//                     message: "Not Found"
//                 })
//             }
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Something went wrong"
//             })
//         })
// }

// const update = (req, res) => {

//     const body = req.body

//     const id = req.params.id

//     const updateUser = {
//         name: body.name,
//         email: body.email,
//         password: body.password
//     }

//     models.User.update(updateUser, { where: { email: body.email}})
//         .then(result => {
//             res.status(200).json({
//                 message: "Updated Successfully",
//                 user: result
//             })
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Something went wrong",
//                 user: error
//             })
//         })
// }

// const destroy = (req, res) => {

//     const body = req.body

//     models.User.destroy({ where: { email: body.email } })
//         .then(result => {
//             res.status(200).json({
//                 message: "Deleted Successfully",
//                 user: result
//             })
//         })
//         .catch(error => {
//             res.status(500).json({
//                 message: "Something went wrong",
//                 user: error
//             })
//         })
// }

// module.exports = {
//     save: save,
//     show: show,
//     showAllUsers: showAllUsers,
//     update: update,
//     destroy: destroy
// }
