import React from 'react'

export default class Player extends React.Component {
  render () {
    return (
      <div id='player-container'>
        <div id='player-controls'>
          <div className='row center'>
            <i className='fa fa-step-backward' />
            <i className='fa fa-pause-circle' />
            <i className='fa fa-step-forward' />
          </div>
        </div>
      </div>
    )
  }
}
