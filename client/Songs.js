import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Typography from '@material-ui/core/Typography';

// const useStyle = makeStyles({
//   root: {
//     minWidth: 275,
//   },
//   media: {
//     height: 0,
//     PaddingTop: '56.25%',
//   },
//   title: {
//     fontSize: 14,
//   },
// });

const Songs = (props) => {
  const { songs, toggleOne, currentSong, isPlaying, isMuted } = props;
  // const classes = useStyle();

  return (
    <table id="songs">
      <tbody>
        <tr className="gray">
          <td />
          <td>#</td>
          <td>Name</td>
          <td>Artist</td>
          <td>Genre</td>
        </tr>
        {songs.map((song, idx) => {
          const isCurrentlyPlaying = currentSong.id === song.id && isPlaying;

          return (
            <tr key={song.id} className={isCurrentlyPlaying ? 'active' : ''}>
              <td>
                <i
                  className={
                    isCurrentlyPlaying
                      ? 'fa fa-stop-circle'
                      : 'fa fa-play-circle'
                  }
                  onClick={() => toggleOne(song, songs)}
                />
              </td>
              <td>{idx + 1}</td>
              <td>{song.name}</td>
              <td>{song.artist.name}</td>
              <td>{song.genre}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Songs;
