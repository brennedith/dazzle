import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap'

/* Imports Panels */
import PerformancePanel from './components/PerformancePanel'
import IncentivesPanel from './components/IncentivesPanel'
import StopwatchsPanel from './components/StopwatchsPanel'

class Calculator extends Component {

  render() {
    
    return (
      <Grid fluid>
        <br />
        <Row>
          <Col smHidden xsHidden>
            <Alert>{ this.props.message }</Alert>
          </Col>
        </Row>
        <Row className="row-level-1">
          <Col md={6}>
            <PerformancePanel
              sales={this.props.sales}
              calls={this.props.calls}
              handleSales={this.props.handleSales}
              handleCalls={this.props.handleCalls} />
          </Col>
          <Col md={6}>
              <StopwatchsPanel />
          </Col>
        </Row>
        <Row className="row-level-1">
          <Col mdOffset={2} md={8}>
            <IncentivesPanel
              sales={this.props.sales} />
          </Col>
        </Row>
      </Grid>
    )
  }
  
}

export default Calculator;
