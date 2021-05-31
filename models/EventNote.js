const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const Schema = mongoose.Schema;

const EventNoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateTime: {
    type: Date,
    required: true,
  },
  duration: {
    type: String,
  },
});

const EventNote = mongoose.model('EventNote', EventNoteSchema);

module.exports = EventNote;
