import React, { Component } from 'react';
import { Grid, Row, Col, Alert, Glyphicon } from 'react-bootstrap'

/* Imports Panels */
import PerformancePanel from './components/PerformancePanel'
import IncentivesPanel from './components/IncentivesPanel'
import StopwatchsPanel from './components/StopwatchsPanel'
import HistoricPanel from './components/HistoricPanel'

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
    
    let totalSales = (this.props.database.length > 0 ?
      this.props.database
        .map((dataset) => parseInt(dataset.s, 10))
        .reduce((a, b) => a + b)
    : 0) + this.props.sales

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
        <Row>
          <Col md={8}>
            <Row>
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
            <Row>
              <Col md={12} smHidden xsHidden>
                <IncentivesPanel
                  sales={totalSales} />
              </Col>
            </Row>
          </Col>
          <Col md={4} smHidden xsHidden>
            <HistoricPanel
              database={this.props.database}
              handleDatabase={this.props.handleDatabase} />
          </Col>
        </Row>
      </Grid>
    )
  }
  
}

export default Calculator;
