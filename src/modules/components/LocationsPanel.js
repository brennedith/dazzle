import React, { Component } from 'react'
import { Panel, Button, Glyphicon } from 'react-bootstrap'

import Cities from '../services/cities.js'

class LocationsPanel extends Component {
  
  constructor(props) {
    
    super(props)
    
    this.handleLocation = this.handleLocation.bind(this)
    this.handleView = this.handleView.bind(this)
    
  }
  
  handleLocation(location) {
    
    this.props.handleLocation(location)
    
  }

  handleView(view) {
    
    this.props.handleView(view)
    
  }
  
  render() {
    
  let locations = null
  let lettersMenu = null
  
  if(this.props.view === '') {
    
    locations = Object.keys(Cities).map((country, idx) => {
      
      let statesObj = Cities[country].states
      
      let states = Object.keys(statesObj).map((state, idx) => (
        <a key={idx} href="#state" onClick={() => this.handleView(`${state}|${country}`)}>{ statesObj[state].name }</a>
      ))
      
      return (
      <p key={idx} className="locations">
        <strong>{ Cities[country].name } </strong>
        { states }
      </p>
      )
    })
    
  } else {
    
    let [ state, country ] = this.props.view.split('|')
    let cities = Cities[country].states[state].cities
    let citiesByLetter = []
    
    cities.map(city => {
      let letter = city.substring(0,1)
      
      if(citiesByLetter[letter] === undefined) {
        citiesByLetter[letter] = []
      }
      
      citiesByLetter[letter].push(city)
      
      return true
    })
    
    lettersMenu = Object.keys(citiesByLetter).map((letter, idx) => (
      <a href={`#${letter}`}>{letter}</a>
    ))
    
    locations = Object.keys(citiesByLetter).map((letter, idx) => {
      
      let cities = citiesByLetter[letter].map((city, idx) => (
        <a key={idx} href="#city" onClick={() => this.handleLocation(`${city}, ${state}`)}>{ city }</a>
      ))
      
      return (
        <p className="locations" key={idx}>
          <strong>
            <a name={letter}>{ letter } </a>
          </strong>
          { cities }
        </p>
      )
      
    })
    
  }
  
    return (
      <Panel>
        <Panel.Heading>
          <Glyphicon glyph="map-marker" /> Locations
        </Panel.Heading>
        <Panel.Body className="panel-body-scroll find-hotel-panel">
        { this.props.view !== '' &&
          <div>
            <Button bsStyle="warning" onClick={() => this.handleView('')}>Go back</Button>
            <hr />
            <p className="locations">
              { lettersMenu }
            </p>
            <hr />
          </div>
        }
        { locations }
        </Panel.Body>
      </Panel>
    )
    
  }
  
}

export default LocationsPanel
