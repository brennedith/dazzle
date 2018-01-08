import React, { Component } from 'react'
import { Grid, Row, Col, Badge } from 'react-bootstrap'

/* import modules and components */
import StaminaBar from './modules/components/StaminaBar'
import Calculator from './modules/Calculator'

class AgentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conversion: 1
    }
    
    this.updateConversion = this.updateConversion.bind(this)
  }
  
  updateConversion(conversion) {
    this.setState({
      conversion: conversion
    })
  }
  
  render() {
    let conversion = this.state.conversion * 100
    
    let statusClass = conversion >= 40 ? 'success' :
                      conversion >= 30 ? 'warning' : 'danger'
    
    return (
      <Grid fluid>
        <Row>
          <StaminaBar now={conversion} bsStyle={statusClass} />
        </Row>
        <Row>
          <Col md={8}>
            <h1>Dazzle</h1>
          </Col>
          <Col md={4}>
            <h2>Conversion <Badge className={`alert-${statusClass}`}>{ conversion.toFixed(2) }%</Badge></h2>
          </Col>
        </Row>
        <hr />
        <Calculator conversion={this.state.conversion} updateConversion={this.updateConversion} />
      </Grid>
    )
  }
}

export default AgentView