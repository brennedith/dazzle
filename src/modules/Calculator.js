import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap'

/* Imports Panels */
import PerformancePanel from './components/PerformancePanel'
import SalesPanel from './components/SalesPanel'
import IncentivesPanel from './components/IncentivesPanel'
import StopwatchsPanel from './components/StopwatchsPanel'

class Calculator extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      sales: new Array(0),
      calls: 0,
      conversion: this.props.conversion,
      alert: 'Hard work beats talent when talent doesn’t work hard.- Tim Notke'
    }
    
    this.handleCalls = this.handleCalls.bind(this)
    this.handleSales =  this.handleSales.bind(this)
  }
  
  handleCalls(calls) {
    this.setState({
      calls: calls
    })
    
    this.updateConversion(this.state.sales.length, calls)
  }
  
  handleSales(sales) {
    this.setState({
      sales: sales
    })
    
    this.updateConversion(sales.length, this.state.calls)
  }
  
  updateConversion(s, c) {
    let sales = parseInt(s, 10)
    let calls = parseInt(c, 10)
    let conversion = calls === 0 ? 1 : (sales / calls)
    
    this.props.updateConversion(conversion)
  }
  
  render() {
    
    let sales = this.state.sales
    let revenue = sales.length > 0 ? sales.reduce((total, value) => total + value ) : 0

    return (
      <Grid fluid>
        <Row>
          <Alert>{ this.state.alert }</Alert>
        </Row>
        <Row className="row-level-1">
          <Col md={8}>
            <Grid fluid>
              <Row>
                <PerformancePanel sales={sales.length} calls={this.state.calls} revenue={revenue} handleCalls={this.handleCalls} />
              </Row>
              <Row className="row-level-1">
                <Col md={6}>
                  <IncentivesPanel level="two" tenure="below60" conversion={this.props.conversion} revenue={revenue} />
                </Col>
                <Col md={6}>
                  <StopwatchsPanel />
                </Col>
              </Row>
            </Grid>
          </Col>
          <Col md={4}>
            <SalesPanel sales={sales} handleSales={this.handleSales} />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Calculator;
