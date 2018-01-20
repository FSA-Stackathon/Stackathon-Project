import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import Sidebar from './Sidebar'
import SingleAlbum from './SingleAlbum'
import AlbumsList from './AlbumsList'
import Player from './Player'

class Main extends React.Component {
  constructor () {
    super()
    this.state = {
      albums: [],
      selectedAlbum: {}
    }
    this.pickAlbum = this.pickAlbum.bind(this)
    this.deselectAlbum = this.deselectAlbum.bind(this)
  }

  async componentDidMount () {
    const {data} = await axios.get('/api/albums')
    this.setState({
      albums: data
    })
  }

  pickAlbum (albumId) {
    return async () => {
      const {data} = await axios.get(`/api/albums/${albumId}`)
      this.setState({
        selectedAlbum: data
      })
    }
  }

  deselectAlbum () {
    this.setState({
      selectedAlbum: {}
    })
  }

  render () {
    return (
      <div id='main'>
        <Player>
          <Sidebar deselectAlbum={this.deselectAlbum} />
          {
            this.state.selectedAlbum.id
              ? <SingleAlbum album={this.state.selectedAlbum} />
              : <AlbumsList albums={this.state.albums} pickAlbum={this.pickAlbum} />
          }
        </Player>
      </div>
    )
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
)
