import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import SelectedAlbum from './SelectedAlbum';
import AlbumsList from './AlbumsList';
import Player from './Player';

const Home = (props) => {
  const { next, prev, toggle, toggleOne, currentSong, isPlaying } = props;

  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState({});

  useEffect(() => {
    async function fetchAlbums() {
      const { data } = await axios.get('/api/albums');
      setAlbums(data);
    }
    fetchAlbums();
  }, []);

  function pickAlbum(albumId) {
    return async () => {
      const { data } = await axios.get(`/api/albums/${albumId}`);
      setSelectedAlbum(data);
    };
  }

  function deselectAlbum() {
    setSelectedAlbum({});
  }

  return (
    <div id='main' className='row container'>
      <Navbar deselectAlbum={deselectAlbum} />
      <div className='container'>
        {selectedAlbum.id ? (
          <SelectedAlbum
            album={selectedAlbum}
            toggleOne={toggleOne}
            isPlaying={isPlaying}
            currentSong={currentSong}
          />
        ) : (
          <AlbumsList albums={albums} pickAlbum={pickAlbum} />
        )}
      </div>
      <Player prev={prev} next={next} toggle={toggle} isPlaying={isPlaying} />
    </div>
  );
};

export default Home;
