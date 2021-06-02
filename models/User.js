const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const idValidator = require('mongoose-id-validator');
const SALT_WORK_FACTOR = 10;
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (value) => {
        const user = await User.findOne({ username: value });
        if (user) {
          return false;
        }
      },
      message: 'This user is already registered',
    },
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async (value) => {
        const email = await User.findOne({ email: value });
        if (email) {
          return false;
        }
      },
      message: 'This email is already registered',
    },
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  subscribes: {
    type: [Schema.Types.ObjectId],
  },
  subscribers: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = nanoid();
};
UserSchema.plugin(idValidator, {
  message: 'Bad ID value for {PATH}',
});
const User = model('User', UserSchema);
module.exports = User;
