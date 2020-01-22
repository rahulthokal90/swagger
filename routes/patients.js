const { Patient, validate } = require('../models/patient');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const patients = await Patient.find()
    .select('-__v')
    .sort('name');
  res.send(patients);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let patient = new Patient({ name: req.body.name });
  patient = await patient.save();

  res.send(patient);
});

router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!patient)
    return res.status(404).send('The patient with the given ID was not found.');

  res.send(patient);
});

router.delete('/:id', async (req, res) => {
  const patient = await Patient.findByIdAndRemove(req.params.id);

  if (!patient)
    return res.status(404).send('The patient with the given ID was not found.');

  res.send(patient);
});

router.get('/:id', async (req, res) => {
  const patient = await Patient.findById(req.params.id).select('-__v');

  if (!patient)
    return res.status(404).send('The patient with the given ID was not found.');

  res.send(patient);
});

module.exports = router;
