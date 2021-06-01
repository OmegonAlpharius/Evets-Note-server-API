const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const config = require('./config');
const EventNote = require('./models/EventNote');

const User = require('./models/User');

mongoose.connect(config.getDbUrl(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await db.dropCollection('eventnotes');
  } catch (e) {
    console.log('Collection Eventnotes  not presented. Skipping drop');
  }

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collection users not presented. Skipping drop');
  }
  try {
    const user1 = await User.create({
      username: 'user',
      password: 'user',
      email: 'user@mail.com',
      token: nanoid(),
    });

    const user2 = await User.create({
      username: 'admin',
      password: 'admin',
      email: 'admin@gmail.com',
      token: nanoid(),
      subscribes: [user1._id],
    });
    await EventNote.create(
      {
        title: 'Test title',
        duration: '3:55',
        dateTime: new Date(),
        creator: user1._id,
      },
      {
        title: 'Why do we use it?',
        duration: '4 hours',
        dateTime: new Date(),
        creator: user2._id,
        __v: 0,
      }
    );

    await db.close();
  } catch (e) {
    console.log(e);
    await db.close();
  }
});
