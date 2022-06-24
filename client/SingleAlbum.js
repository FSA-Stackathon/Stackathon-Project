import React from 'react';
import Album from './Album';
import Songs from './Songs';

const SingleAlbum = (props) => {
  const { album, toggleOne, isPlaying, currentSong, isMuted } = props;

  return (
    <div id="single-album" className="column">
      <Album album={album} />
      <Songs
        songs={album.songs}
        toggleOne={toggleOne}
        isPlaying={isPlaying}
        currentSong={currentSong}
        isMuted={isMuted}
      />
    </div>
  );
};

export default SingleAlbum;
