import React from 'react'
import Album from './Album'
import Songs from './Songs'

const SingleAlbum = (props) => {
  return (
    <div id='single-album' className='column'>
      <Album album={props.album} />
      <Songs songs={props.album.songs} />
    </div>
  )
}

export default SingleAlbum
