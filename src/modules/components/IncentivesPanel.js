import React, { Component } from 'react'
import { Grid, Row, Col, Panel, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'

import QuotesService from '../services/quotes'

class IncentivesPanel extends Component {

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
      <Panel>
        <Panel.Heading>Incentives by CPH</Panel.Heading>
        <Panel.Body>
          <Grid fluid>
            <Row>
              <Col md={3}>
                <InputGroup bsSize="lg">
                  <InputGroup.Addon>3.0</InputGroup.Addon>
                  <FormControl componentClass="span">${ this.props.sales * 18 }</FormControl>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup bsSize="lg">
                  <InputGroup.Addon>3.5</InputGroup.Addon>
                  <FormControl componentClass="span">${ this.props.sales * 24 }</FormControl>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup bsSize="lg">
                  <InputGroup.Addon>4.0</InputGroup.Addon>
                  <FormControl componentClass="span">${ this.props.sales * 26 }</FormControl>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup bsSize="lg">
                  <InputGroup.Addon>4.5</InputGroup.Addon>
                  <FormControl componentClass="span">${ this.props.sales * 28 }</FormControl>
                </InputGroup>
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
        <Panel.Footer className="hidden-sm, hidden-xs">
            <Glyphicon glyph="info-sign" onClick={this.updateQuote} />
            &nbsp;
            { this.state.quote }
        </Panel.Footer>
      </Panel>
    )

  }
}

export default IncentivesPanel
