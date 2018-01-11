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
      sales: new Array(0),
      calls: 0,
      conversion: 1,
      level: 'two',
      tenure: 'above60',
      theme: 'Flatly'
    }
    
    this.today = Math.floor((new Date()).getTime() / 1000 / 60 / 60 / 24)
    
    this.handleSales =  this.handleSales.bind(this)
    this.handleCalls = this.handleCalls.bind(this)
    this.handleTheme = this.handleTheme.bind(this)
  }
  
  componentDidMount() {
    let lastUse = parseInt(localStorage.getItem('lastUse'), 10)
    
    if(this.today === lastUse) {
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
    })
    
    this.handleConversion(sales.length, this.state.calls)
  }
  
  handleCalls(calls) {
    this.setState({
      calls: calls
    })
    
    this.handleConversion(this.state.sales.length, calls)
  }
  
  handleConversion(s, c) {
    let sales = parseInt(s, 10)
    let calls = parseInt(c, 10)
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
  
  render() {
    let conversion = this.state.conversion * 100
    
    let statusClass = conversion >= 40 ? 'success' :
                      conversion >= 30 ? 'warning' : 'danger'

    return (
      <Grid fluid>
        { this.state.theme !== 'Default' &&
          <link rel="stylesheet" href={ `/styles/themes/${this.state.theme}.css` }/>
        }
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
          <Tabs className="tabs" defaultActiveKey={2} animation={false} id="tabs">
            <Tab eventKey={1} title="Calculator">
              <Calculator sales={this.state.sales} calls={this.state.calls} conversion={this.state.conversion} level={this.state.level} tenure={this.state.tenure} handleSales={this.handleSales} handleCalls={this.handleCalls} />
            </Tab>
            <Tab eventKey={2} title="Hotels">
              <FindHotel />
            </Tab>
            <Tab eventKey={3} title="About">
              <About theme={this.state.theme} handleTheme={this.handleTheme} />
            </Tab>
          </Tabs>
        </Row>
      </Grid>
    )
  }
}

export default AgentView