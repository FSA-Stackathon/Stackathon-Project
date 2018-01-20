import React from 'react'
import Album from './Album'
import Songs from './Songs'

const SingleAlbum = (props) => {
  return (
    <div className='row'>
      <Album album={props.album} />
      <Songs songs={props.album.songs} artist={props.album.artist} />
    </div>
  )
}

export default SingleAlbum
