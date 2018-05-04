import React, { Component } from 'react';
import { Grid, Row, Col, Alert, Glyphicon } from 'react-bootstrap'

/* Imports Panels */
import PerformancePanel from './components/PerformancePanel'
import IncentivesPanel from './components/IncentivesPanel'
import StopwatchsPanel from './components/StopwatchsPanel'

import QuotesService from './services/quotes'

class Calculator extends Component {

  constructor(props) {
    
    super(props)
    
    this.state = {
      quote: QuotesService.random()
    }
    
    this.updateQuote = this.updateQuote.bind(this)

  }

  updateQuote() {
    
    this.setState({
      quote: QuotesService.random()
    })
    
  }

  render() {
    
    return (
      <Grid fluid>
        <br />
        <Row>
          <Col smHidden xsHidden>
            <Alert>
              <Glyphicon glyph="info-sign" onClick={this.updateQuote} />
              &nbsp;
            { this.state.quote }
            </Alert>
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
