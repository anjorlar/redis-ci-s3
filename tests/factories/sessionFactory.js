require('dotenv')
const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
// const keys = require('../../config/keys');
const keys = process.env.COOKIE_KEY
const keygrip = new Keygrip([keys]);

module.exports = user => {
  const sessionObject = {
    passport: {
      user: user._id.toString()
    }
  };
  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');
  const sig = keygrip.sign('session=' + session);

  return { session, sig };
};
