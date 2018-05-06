import React, { Component } from 'react'
import { Grid, Row, Col, Panel, FormControl, InputGroup, Button, Glyphicon } from 'react-bootstrap'

class PerformancePanel extends Component {
  
  constructor(props) {
    
    super(props)
    
    this.addSales = this.addSales.bind(this)
    this.addCall = this.addCall.bind(this)
    this.handleSales = this.handleSales.bind(this)
    this.handleCalls = this.handleCalls.bind(this)
    
  }
  
  addSales() {
    
    this.props.handleSales(parseInt(this.props.sales,10) + 1)
    
  }

  addCall() {
    
    this.props.handleCalls(parseInt(this.props.calls,10) + 1)
    
  }
  
  handleSales(e) {
    
    this.props.handleSales(e.target.value)
    
  }
  
  handleCalls(e) {
    
    this.props.handleCalls(e.target.value)
    
  }
  
  render() {
        
    return (
      <Panel>
        <Panel.Heading>Today's Performance</Panel.Heading>
        <Panel.Body>
          <Grid fluid>
            <Row>
              <Col className="less-clutter" md={6} sm={6} xs={6}>
              <InputGroup bsSize="sm">
                  <InputGroup.Addon>S</InputGroup.Addon>
                  <FormControl type="number" min="0" value={this.props.sales} onChange={this.handleSales} />
                  <InputGroup.Button>
                    <Button bsStyle="success" onClick={this.addSales}>
                      <Glyphicon glyph="plus" />
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </Col>
              <Col className="less-clutter" md={6} sm={6} xs={6}>
                <InputGroup bsSize="sm">
                  <InputGroup.Addon>C</InputGroup.Addon>
                  <FormControl type="number" min="0" value={this.props.calls} onChange={this.handleCalls} />
                  <InputGroup.Button>
                    <Button bsStyle="primary" onClick={this.addCall}>
                      <Glyphicon glyph="plus" />
                    </Button>
                  </InputGroup.Button>
                </InputGroup>
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
      </Panel>
    )
    
  }
  
}

export default PerformancePanel
