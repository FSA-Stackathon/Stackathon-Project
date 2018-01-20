import React from 'react'

const Songs = (props) => {
  const songs = props.songs

  return (
    <table>
      <tbody>
        <tr>
          <td />
          <td>#</td>
          <td>Name</td>
        </tr>
        {
          songs.map((song, idx) => {
            return (
              <tr key={song.id}>
                <td><img src='/play.png' className='media-btn' /></td>
                <td>{idx + 1}</td>
                <td>{song.name}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}

export default Songs
