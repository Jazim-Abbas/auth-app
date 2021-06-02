const yup = require("yup");

const venueOwnerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(10).required(),
  familyName: yup.string(),
  phone: yup.number(),
  venueName: yup.string(),
  streetNumber: yup.number(),
  streetName: yup.string(),
  town: yup.string(),
  postcode: yup.number(),
});

const updateSchema = yup.object({
  venueName: yup.string(),
  streetNumber: yup.number(),
  streetName: yup.string(),
  town: yup.string(),
  postcode: yup.number(),
});

module.exports = { venueOwnerSchema, updateSchema };
