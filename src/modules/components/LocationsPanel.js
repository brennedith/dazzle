import React, { Component } from 'react'
import { Panel, Button, Glyphicon } from 'react-bootstrap'

import Cities from '../services/cities.js'

class LocationsPanel extends Component {
  
  constructor(props) {
    super(props)
    
    this.handleLocation = this.handleLocation.bind(this)
    this.handleView = this.handleView.bind(this)
  }
  
  handleLocation(e) {
    this.props.handleLocation(e.target.dataset.location)
  }

  handleView(e) {
    this.props.handleView(e.target.dataset.view)
  }
  
  render() {
    
  let locations = null
  let lettersMenu = null
  
  if(this.props.view === '') {
    
    locations = Object.keys(Cities).map((country, idx) => {
      
      let statesObj = Cities[country].states
      
      let states = Object.keys(statesObj).map((state, idx) => (
        <a key={idx} href={`#${state}`} data-view={`${state}|${country}`} onClick={this.handleView}>{ statesObj[state].name }</a>
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
    
    lettersMenu = Object.keys(citiesByLetter).map((letter, key) => (
      <a href={`#${letter}`}>{letter}</a>
    ))
    
    locations = Object.keys(citiesByLetter).map((letter, key) => {
      
      let cities = citiesByLetter[letter].map((city, key) => (
        <a key={key} href={`#${city}`} data-location={`${city}, ${state}`} onClick={this.handleLocation}>{ city }</a>
      ))
      
      return (
        <p className="locations" key={key}>
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
            <Button bsStyle="warning" data-view="" onClick={this.handleView}>Go back</Button>
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