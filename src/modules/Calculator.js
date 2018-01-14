import React, { Component } from 'react';
import { Grid, Row, Col, Alert } from 'react-bootstrap'

/* Imports Panels */
import PerformancePanel from './components/PerformancePanel'
import SalesPanel from './components/SalesPanel'
import IncentivesPanel from './components/IncentivesPanel'
import StopwatchsPanel from './components/StopwatchsPanel'

class Calculator extends Component {

  render() {
    
    let sales = this.props.sales
    let revenue = sales.length > 0 ? sales.reduce((total, value) => total + value ) : 0

    return (
      <Grid fluid>
        <br />
        <Row>
          <Col smHidden xsHidden>
            <Alert>{ this.props.message }</Alert>
          </Col>
        </Row>
        <Row className="row-level-1">
          <Col md={8}>
            <Grid fluid>
              <Row>
                <PerformancePanel
                  sales={sales.length}
                  calls={this.props.calls}
                  revenue={revenue}
                  handleCalls={this.props.handleCalls} />
              </Row>
              <Row className="row-level-1">
                <Col md={6} smHidden xsHidden>
                  <IncentivesPanel
                    conversion={this.props.conversion}
                    level={this.props.level}
                    tenure={this.props.tenure}
                    revenue={revenue} />
                </Col>
                <Col md={6} smHidden xsHidden>
                  <StopwatchsPanel />
                </Col>
              </Row>
            </Grid>
          </Col>
          <Col md={4}>
            <SalesPanel
              sales={sales}
              handleSales={this.props.handleSales} />
          </Col>
        </Row>
      </Grid>
    )
  }
  
}

export default Calculator;
