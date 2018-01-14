import React, { Component } from 'react'
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'

import HotelsPanel from './components/HotelsPanel.js'
import LocationsPanel from './components/LocationsPanel.js'

class FindHotel extends Component {
  
  constructor(props) {
    
    super(props)

    this.state = {
      view: '',
      hotel: '#Hotel',
      location: '#Location'
    }

    this.handleView = this.handleView.bind(this)
    this.handleHotel = this.handleHotel.bind(this)
    this.handleLocation = this.handleLocation.bind(this)
    this.clearQuery = this.clearQuery.bind(this)
    this.openMap = this.openMap.bind(this)
    
  }
  
  handleView(view) {
    
    this.setState({
      view: view
    })
    
  }
  
  handleHotel(hotel) {
    
    this.setState({
      hotel: hotel
    })
    
  }
  
  handleLocation(location) {
    
    this.setState({
      location: location
    })
    
  }
  
  clearQuery() {
    
    this.setState({
      view: '',
      hotel: '#Hotel',
      location: '#Location'
    })
    
  }
  
  openMap() {
    
    let query = `https://www.google.com/maps/search/${this.state.hotel} ${this.state.location}`
    window.open(encodeURI(query))
    
  }
  
  render() {
    
    let link = null
    
    if(!!this.state.hotel.indexOf('#') && !!this.state.location.indexOf('#')) {
      link = <a href="#openMap" onClick={this.openMap}>{this.state.hotel} - {this.state.location}</a>
    } else {
      link = `${this.state.hotel} - ${this.state.location}`
    }
    
    return (
      <Grid fluid>
        <Row>
          <h1 className="center">
            { link }
            <span>   </span>
            { (!!this.state.hotel.indexOf('#') || !!this.state.location.indexOf('#')) &&
              <Button bsStyle="danger" bsSize="sm" onClick={this.clearQuery}>
                <Glyphicon glyph="erase" />
              </Button>
            }
          </h1>
        </Row>
        <Row>
          <Col md={6}>
            <LocationsPanel view={this.state.view} handleView={this.handleView} handleLocation={this.handleLocation} />
          </Col>
          <Col md={6}>
            <HotelsPanel handleHotel={this.handleHotel}/>
          </Col>
        </Row>
      </Grid>
    )
    
  }
  
}

export default FindHotel
