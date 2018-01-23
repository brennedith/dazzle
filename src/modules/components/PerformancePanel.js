import React, { Component } from 'react'
import { Grid, Row, Col, Panel, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

import QuotesService from '../services/quotes'

class PerformancePanel extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      quote: QuotesService.random()
    }
    
    this.updateQuote = this.updateQuote.bind(this)
    this.handleCalls = this.handleCalls.bind(this)
  }
  
  updateQuote() {
    this.setState({
      quote: QuotesService.random()
    })
  }
  
  handleCalls(e) {
    this.props.handleCalls(e.target.value)
  }
  
  render() {
    let aov = ( this.props.revenue / this.props.sales ) || 0
    
    return (
      <Panel>
        <Panel.Heading>Performance</Panel.Heading>
        <Panel.Body>
          <Grid fluid>
            <Row>
              <Col md={3}>
                <InputGroup bsSize="sm">
                  <InputGroup.Addon>Sales</InputGroup.Addon>
                  <FormControl componentClass="span">
                    { this.props.sales }
                  </FormControl>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup bsSize="sm">
                  <InputGroup.Addon>Calls</InputGroup.Addon>
                  <FormControl type="number" min="0" value={this.props.calls} onChange={this.handleCalls} />
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup bsSize="sm">
                  <InputGroup.Addon>Revenue</InputGroup.Addon>
                  <FormControl componentClass="span">
                    { `$ ${this.props.revenue.toFixed(2)}` }
                  </FormControl>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup bsSize="sm">
                  <InputGroup.Addon>AOV</InputGroup.Addon>
                  <FormControl componentClass="span">
                    { `$ ${aov.toFixed(2)}` }
                  </FormControl>
                </InputGroup>
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
        <Panel.Footer>
          <Glyphicon glyph="info-sign" onClick={this.updateQuote} />
          &nbsp;
          { this.state.quote }
        </Panel.Footer>
      </Panel>
    )
  }
}

export default PerformancePanel
