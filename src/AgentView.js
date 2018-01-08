import React, { Component } from 'react'
import { Grid, Row, Col, Badge, Tabs, Tab } from 'react-bootstrap'

/* import modules and components */
import StaminaBar from './modules/components/StaminaBar'
import Calculator from './modules/Calculator'
import About from './modules/About'

class AgentView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sales: new Array(0),
      calls: 0,
      conversion: 1,
      level: 'two',
      tenure: 'below60',
      theme: 'Default'
    }
    
    this.handleSales =  this.handleSales.bind(this)
    this.handleCalls = this.handleCalls.bind(this)
    this.handleTheme = this.handleTheme.bind(this)
  }
  
  componentDidMount() {
    /* TODO */
  }
  
  componentWillUnmount() {
    /* TODO */
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
          <link rel="stylesheet" href={ `https://bootswatch.com/3/${this.state.theme.toLowerCase()}/bootstrap.min.css` }/>
        }
        <link rel="stylesheet" href="/css/custom.css" />
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
        <Row>
          <Tabs className="tabs" defaultActiveKey={1} animation={false} id="tabs">
            <Tab eventKey={1} title="Calculator">
              <Calculator sales={this.state.sales} calls={this.state.calls} conversion={this.state.conversion} handleSales={this.handleSales} handleCalls={this.handleCalls} />
            </Tab>
            <Tab eventKey={2} title="About">
              <About theme={this.state.theme} handleTheme={this.handleTheme} />
            </Tab>
          </Tabs>
        </Row>
      </Grid>
    )
  }
}

export default AgentView