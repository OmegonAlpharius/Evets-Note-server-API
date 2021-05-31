const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const config = require('./config');

const User = require('./models/User');

mongoose.connect(config.getDbUrl(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.once('open', async () => {
  try {
    await db.dropCollection('EventNotes');
  } catch (e) {
    console.log('Collection were not presented. Skipping drop');
  }

  try {
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collection were not presented. Skipping drop');
  }

  // const [cpuCategory, hddCategory] = await Category.create({
  //     title: "CPUs",
  //     description: "Central Processor Units"
  // }, {
  //     title: "HDDs",
  //     description: "Hard Disk Drives"
  // });
  try {
    await User.create(
      {
        username: 'user',
        password: 'user',
        email: 'user@mail.com',
        token: nanoid(),
      },
      {
        username: 'admin',
        password: 'admin',
        email: 'admin@gmail.com',
        token: nanoid(),
      }
    );

    await db.close();
  } catch (e) {
    console.log(e);
    await db.close();
  }
});
