//this is the access point for all things database related!
const db = require('./db');
const User = require('./models/User');
const Album = require('./models/Album');
const Artist = require('./models/Artist');
const Playlist = require('./models/Playlist');
const PlaylistHistory = require('./models/PlaylistHistory');
const Song = require('./models/Song');

// Model associations
Song.belongsTo(Album);
Album.hasMany(Song);

Song.belongsTo(Artist);
Artist.hasMany(Song);

Album.belongsTo(Artist);
Artist.hasMany(Album);

// Album.belongsTo(Playlist);
// Playlist.hasMany(Album);

// Playlist.belongsTo(PlaylistHistory);
// PlaylistHistory.hasMany(Playlist);

// User.hasOne(PlaylistHistory);
// PlaylistHistory.belongsTo(User);

// User.hasMany(Playlist);
// Playlist.belongsTo(User);

module.exports = {
  db,
  User,
  Album,
  Artist,
  Playlist,
  PlaylistHistory,
  Song,
};
