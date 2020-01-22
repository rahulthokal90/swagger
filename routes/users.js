const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const _ = require('loader');
/**
 * @swagger
 * /users:
 *   get
 *     description:This should return all user
 */
router.get('/', async (req, res) => {
  const genres = await User.findOne({ email: 'techguyinfo@gmail.com' })
    .select('-__v')
    .sort('name');
  res.send(genres);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already registered');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = bcrypt.salt(10);
  user.password = bcrypt.hash(user.password, salt);
  await user.save();

  const token = generateAuthToken();

  res
    .header('x-auth-token', token)
    .send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;
