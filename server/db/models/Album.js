const Sequelize = require('sequelize');
const db = require('../db');

const Album = db.define('album', {
  name: {
    type: Sequelize.STRING,
  },
  image_url: {
    type: Sequelize.TEXT,
  },
});

module.exports = Album;
