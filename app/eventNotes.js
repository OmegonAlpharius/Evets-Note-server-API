const express = require('express');
const { now } = require('mongoose');
const auth = require('../middlewares/auth');
const EventNote = require('../models/EventNote');

const router = express.Router();

const createRouter = () => {
  router.get('/', auth, async (req, res) => {
    try {
      const query = EventNote.find()
        .where('creator')
        .in([req.user._id, ...req.user.subscribes])
        .where('dateTime')
        .gte(new Date())
        .sort('dateTime')
        .populate('creator', 'username');

      const EventNotes = await query;
      res.send(EventNotes);
    } catch (err) {
      console.log(err);
      return res.status(400).send(err);
    }
  });

  router.post('/', auth, async (req, res) => {
    const newEvent = { ...req.body };
    newEvent.creator = req.user._id;
    const result = new EventNote(newEvent);
    try {
      await result.save();
      res.send(result);
    } catch (err) {
      console.log(err);
      res.status(400).send(err);
    }
  });

  router.delete('/', auth, async (req, res) => {
    try {
      await EventNote.deleteOne({ _id: req.query.id, creator: req.user._id });

      res.send({ _id: req.params.id });
    } catch (err) {
      res.sendStatus(400);
    }
  });
  return router;
};

module.exports = createRouter;
