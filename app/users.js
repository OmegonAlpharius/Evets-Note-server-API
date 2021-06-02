const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

const createRouter = () => {
  router.get('/', async (req, res) => {
    try {
      const users = await User.find({}, 'email');
      res.send(users);
    } catch (err) {
      console.log(err);
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
    const user = await User.findOne({ username: req.body.username }).populate(
      'subscribers',
      'username'
    );

    const errorMessage = 'Wrong username or password';

    if (!user) return res.status(400).send({ error: errorMessage });

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) return res.status(400).send({ error: errorMessage });

    user.generateToken();
    try {
      await user.save({ validateBeforeSave: false });
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
    console.log(user);
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
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  });

  router.post('/subscribe', auth, async (req, res) => {
    const subscriberId = req.query.id;
    const user = req.user;
    if (subscriberId === user._id) {
      return res.send({ message: 'Subscribe success' });
    }

    try {
      const isSubscribed = await User.findOne({ _id: subscriberId }).where({
        subscribes: { $in: [user] },
      });
      if (isSubscribed) {
        return res.send({ message: 'User already subscribed' });
      }

      const subscriber = await User.findOne({ _id: subscriberId });

      if (!subscriber) {
        return res.status(400).send({ message: 'User not found' });
      }

      subscriber.subscribes.push(user._id);
      await subscriber.save({ validateBeforeSave: false });
      user.subscribers.push(subscriberId);
      await user.save({ validateBeforeSave: false });

      res.send({ message: 'Subscribe success' });
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.get('/subscribers', auth, async (req, res) => {
    if (!req.user) {
      return res.sendStatus(400);
    }
    res.send(req.user.subscribers);
  });

  router.post('/unsubscribe', auth, async (req, res) => {
    try {
      const users = await User.find({}, 'email');
      res.send(users);
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  return router;
};

module.exports = createRouter;
