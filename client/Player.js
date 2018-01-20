import React from 'react'

export default class Player extends React.Component {

  render () {
    return (
      <div id='player-container' className='row container'>
        {this.props.children}
        <div id='player-controls'>
        </div>
      </div>
    )
  }
}
