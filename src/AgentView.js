import React, { Component } from 'react'
import { Grid, Row, Col, Badge, Tabs, Tab } from 'react-bootstrap'

/* import modules and components */
import StaminaBar from './modules/components/StaminaBar'
import Calculator from './modules/Calculator'
import FindHotel from './modules/FindHotel'
import About from './modules/About'

class AgentView extends Component {
  
  constructor(props) {
    
    super(props)
    
    this.state = {
      sales: 0,
      calls: 0,
      conversion: 1,
      level: 'three',
      tenure: 'above60',
      message: 'Remember to use the sales process: Opening > Probing > Benefits > Offer > Close',
      theme: 'United',
    }
    
    this.today = Math.floor((new Date()).getTime() / 1000 / 60 / 60 / 24)
    this.lastUse = parseInt(localStorage.getItem('lastUse'), 10) || 0
    
    this.handleSales =  this.handleSales.bind(this)
    this.handleCalls = this.handleCalls.bind(this)
    this.handleTheme = this.handleTheme.bind(this)
    this.handleTenure =  this.handleTenure.bind(this)
    
  }
  
  componentWillMount() {
    
    if(this.today === this.lastUse) {
      let dazzle = JSON.parse(localStorage.getItem('dazzle'))
      this.setState(dazzle)
    }
    
  }
  
  componentDidUpdate() {
    
    localStorage.setItem('lastUse', this.today)
    localStorage.setItem('dazzle', JSON.stringify(this.state))
    
  }
  
  handleSales(sales) {
    
    this.setState({
      sales: sales
    }, this.handleConversion)
    
  }
  
  handleCalls(calls) {
    
    this.setState({
      calls: calls
    }, this.handleConversion)

  }
  
  handleConversion() {
    
    let sales = parseInt(this.state.sales, 10)
    let calls = parseInt(this.state.calls, 10)
    let conversion = calls === 0 ? 1 : (sales / calls)
    
    this.setState({
      conversion: conversion
    })
    
  }
  
  handleTheme(theme) {
    
    this.setState({
      theme: theme
    })
    
  }
  
  handleTenure(tenure) {
    
    this.setState({
      tenure: tenure
    })
    
  }
  
  render() {
    
    let conversion = this.state.conversion * 100
    
    let statusClass = conversion >= 40 ? 'success' :
                      conversion >= 30 ? 'warning' : 'danger'
    
    return (
      <Grid fluid>
        <link rel="stylesheet" href={ `/styles/themes/${this.state.theme}.css` }/>
        <link rel="stylesheet" href="/styles/custom.css" />
        <Row>
          <StaminaBar now={conversion} bsStyle={statusClass} />
        </Row>
        <Row>
          <Col md={8} smHidden xsHidden>
            <h1>Dazzle</h1>
          </Col>
          <Col md={4}>
            <h2 className="center">Conversion <Badge className={`alert-${statusClass}`}>{ conversion.toFixed(2) }%</Badge></h2>
          </Col>
        </Row>
        <hr />
        <Row>
          <Tabs className="tabs" defaultActiveKey={3} animation={false} id="tabs">
            <Tab eventKey={1} title="Calculator">
              <Calculator
                sales={this.state.sales}
                calls={this.state.calls}
                conversion={this.state.conversion}
                level={this.state.level}
                tenure={this.state.tenure}
                message={this.state.message}
                handleSales={this.handleSales}
                handleCalls={this.handleCalls} />
            </Tab>
            <Tab eventKey={2} title="Hotels">
              <FindHotel />
            </Tab>
            <Tab eventKey={3} title="About">
              <About
                tenure={this.state.tenure}
                theme={this.state.theme}
                handleTenure={this.handleTenure}
                handleTheme={this.handleTheme} />
            </Tab>
          </Tabs>
        </Row>
      </Grid>
    )
    
  }
  
}

export default AgentView
