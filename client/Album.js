import React from 'react';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

const Album = (props) => {
  const name = props.album.name;
  const artworkUrl = props.album.artworkUrl;
  const artist = props.album.artist.name;
  const pickAlbum = props.pickAlbum;

  return (
    <Container>
      <Paper
        elevation={8}
        style={{ backgroundImage: `url(${artworkUrl})`, height: '800px' }}
        onClick={pickAlbum && pickAlbum(props.album.id)}
      >
        <div style={{ textAlign: 'center', color: 'white'}}>
          <p style={{ fontSize: '18px'}}>{name}</p>
          <small style={{ color: 'white' }}>{artist}</small>
        </div>
      </Paper>
    </Container>
  );
};

export default Album;
