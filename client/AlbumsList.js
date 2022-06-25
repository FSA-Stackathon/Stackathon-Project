import React from 'react';
import Album from './Album';
import Carousel from 'react-material-ui-carousel';

const AlbumsList = (props) => {
  const albums = props.albums;
  const pickAlbum = props.pickAlbum;

  return (
    <Carousel>
      {albums.map((album) => (
        <Album album={album} key={album.id} pickAlbum={pickAlbum} />
      ))}
    </Carousel>
  );
};

export default AlbumsList;
