import React, { Component } from 'react'
import { Grid, Row, Col, Panel, FormControl, InputGroup, Button, Table, Glyphicon } from 'react-bootstrap'

class SalesPanel extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      revenue: '',
      sales: this.props.sales
    }
    
    this.updateRevenue = this.updateRevenue.bind(this)
    this.addSale = this.addSale.bind(this)
    this.removeSale = this.removeSale.bind(this)
  }

  updateRevenue(e) {
    this.setState({
      revenue: e.target.value
    })
  }
  
  addSale() {
    if(this.state.revenue === '' || this.state.revenue === 0) {
      return
    }
    
    let sales = this.state.sales
    sales.push(parseFloat(this.state.revenue))
    
    this.setState({
      sales: sales,
      revenue: ''
    })
    
    this.handleSales()
  }
  
  removeSale(e) {
    let idx = e.target.dataset.idx
    let sales = this.state.sales
    sales.splice(idx, 1)
    
    this.setState({
      sales: sales
    })
    
    this.handleSales()
  }

  handleSales() {
    this.props.handleSales(this.state.sales)
  }
  
  render() {
    
    let sales = this.state.sales.map((sale, idx) => (
      <tr key={idx}>
        <td>{ idx + 1 }</td>
        <td>{ `$ ${ sale.toFixed(2)}` }</td>
        <td>
          <Button bsStyle="danger" bsSize="xs" data-idx={idx} onClick={this.removeSale}>
            <Glyphicon glyph="trash" />
          </Button>
        </td>
      </tr>
    ))
    
    return (
      <Panel>
        <Panel.Heading>Sales</Panel.Heading>
        <Panel.Body>
          <Grid fluid>
            <Row>
              <Col md={4}>
                <InputGroup bsSize="sm">
                  <InputGroup.Addon>Sale no.</InputGroup.Addon>
                  <FormControl componentClass="span">
                    { this.props.sales.length + 1 }
                  </FormControl>
                </InputGroup>
              </Col>
              <Col md={6}>
                <InputGroup bsSize="sm">
                  <InputGroup.Addon>Revenue</InputGroup.Addon>
                  <FormControl type="number" min="0" value={this.state.revenue} onChange={this.updateRevenue}></FormControl>
                </InputGroup>
              </Col>
              <Col md={2}>
                <Button bsStyle="success" bsSize="sm" onClick={this.addSale}>
                  <Glyphicon glyph="plus" />
                </Button>
              </Col>
            </Row>
            <hr />
            <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    { sales }
                  </tbody>
                </Table>
            </Row>
          </Grid>
        </Panel.Body>
      </Panel>
    )
  }
}

export default SalesPanel
