const Sequelize = require('sequelize');
const db = require('../db');

const PlaylistHistory = db.define('playlist_history', {
  playlistHistory: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
});

module.exports = PlaylistHistory;
