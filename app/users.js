const express = require('express');
const User = require('../models/User');

const router = express.Router();

const createRouter = () => {
  router.get('/', async (req, res) => {
    try {
      const { email } = req.query;
      const users = await User.find({ email });
      res.send(users);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  router.post('/', async (req, res) => {
    try {
      const user = new User(req.body);
      user.generateToken();
      await user.save();
      res.send(user);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });
  router.post('/sessions', async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    const errorMessage = 'Wrong username or password';

    if (!user) return res.status(400).send({ error: errorMessage });

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) return res.status(400).send({ error: errorMessage });

    user.generateToken();
    try {
      await user.save({ validateBeforeSave: false });
    } catch (e) {
      res.status(500).send(e);
    }

    res.send(user);
  });
  router.delete('/sessions', async (req, res) => {
    const token = req.get('Authentication');
    const success = { message: 'Success' };

    if (!token) return res.send(success);

    const user = await User.findOne({ token });

    if (!user) return res.send(success);

    user.generateToken();
    try {
      await user.save({ validateBeforeSave: false });
      return res.send(success);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  return router;
};

module.exports = createRouter;
