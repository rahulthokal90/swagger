const Joi = require('joi');
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

const Patient = mongoose.model('Patient', patientSchema);

function validateGenre(petient) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required()
  };

  return Joi.validate(petient, schema);
}

exports.patientSchema = patientSchema;
exports.Patient = Patient;
exports.validate = validateGenre;
