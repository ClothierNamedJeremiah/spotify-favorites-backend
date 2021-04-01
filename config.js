const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  SERVER_REDIRECT_URI: process.env.SERVER_REDIRECT_URI,
  PORT: process.env.PORT,
  CLIENT_REDIRECT_URI: process.env.CLIENT_REDIRECT_URI,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
};
