import React, { Component } from 'react'
import { Panel, Glyphicon } from 'react-bootstrap'

import Chains from '../services/chains.js'

class HotelsPanel extends Component {
  
  constructor(props) {
    
    super(props)
    
    this.handleHotel = this.handleHotel.bind(this)
    
  }

  handleHotel(hotel) {
    
    this.props.handleHotel(hotel)
    
  }
  
  render() {
    
    let hotelsList = Chains.map((chain, idx) => {
      
      let hotels = chain.hotels.map((hotel, idx) => (
        <a key={idx} href="#hotel" onClick={() => this.handleHotel(hotel)}>{ hotel }</a>
      ))
      
      return (
        <p key={idx} className="hotels">
          <strong>{ chain.name } </strong>
          { hotels }
        </p>
      )
      
    })
    
    return (
      <Panel>
        <Panel.Heading>
          <Glyphicon glyph="bed" /> Hotels
        </Panel.Heading>
        <Panel.Body className="panel-body-scroll find-hotel-panel">
          { hotelsList }
        </Panel.Body>
      </Panel>
    )
    
  }
  
}

export default HotelsPanel
