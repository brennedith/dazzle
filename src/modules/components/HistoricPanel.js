import React, { Component } from 'react'
import { Grid, Row, Col, Panel, FormControl, InputGroup, Button, Table, Glyphicon } from 'react-bootstrap'

class SalesPanel extends Component {
  
  constructor(props) {
    
    super(props)

    this.brandNewState = {
      day: 0,
      sales: 0,
      calls: 0,
    }

    this.state = this.brandNewState
    
    this.updateDay = this.updateDay.bind(this)
    this.updateSales = this.updateSales.bind(this)
    this.updateCalls = this.updateCalls.bind(this)

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.addRecord = this.addRecord.bind(this)
    this.removeRecord = this.removeRecord.bind(this)
    
  }

  updateDay(e) {

    this.setState({
      day: e.target.value
    })

  }
  
  updateSales(e) {

    this.setState({
      sales: e.target.value
    })

  }

  updateCalls(e) {

    this.setState({
      calls: e.target.value
    })

  }

  addRecord() {
    
    let day = parseInt(this.state.day, 10)
    let sales = parseInt(this.state.sales, 10)
    let calls = parseInt(this.state.calls, 10)
    
    if( isNaN(day) || isNaN(sales) || isNaN(calls)) {
      return
    }
    
    let database = this.props.database
    database.push({
      d: day,
      s: sales,
      c: calls
    })
    
    this.setState(this.brandNewState)
    
    this.props.handleDatabase(database)
    
  }
  
  removeRecord(index) {
    
    let database = this.props.database
    database.splice(index, 1)
    
    this.props.handleDatabase(database)
    
  }

  handleKeyPress(e) {
    
    if(e.charCode === 13) {
      this.addRecord()
    }
    
  }
  
  render() {
    
    let totalSales = this.props.database.length > 0 ?
      this.props.database
        .map((result) => parseInt(result.s, 10))
        .reduce((a, b) => a + b) || 0
    : 0
    
    let totalCalls = this.props.database.length > 0 ?
      this.props.database
        .map((result) => parseInt(result.c, 10))
        .reduce((a, b) => a + b) || 0
    : 0

    let grandTotal = (
      <tr>
        <td></td>
        <td>
          <strong>{ totalSales }</strong>
        </td>
        <td>
          <strong>{ totalCalls }</strong>
        </td>
        <td>
          <strong>{ totalCalls > 0 ?
            (totalSales / totalCalls * 100).toFixed(2)
          : 0 }%</strong>
        </td>
      </tr>  
    )
    
    let salesList = this.props.database.map((result, index) => (
      <tr key={index}>
        <td>{ result.d }</td>
        <td>{ result.s }</td>
        <td>{ result.c }</td>
        <td>
          <Button bsStyle="danger" bsSize="xs" onClick={() => this.removeRecord(index)}>
            <Glyphicon glyph="trash" />
          </Button>
        </td>
      </tr>
    ))

    return (
      <Panel>
        <Panel.Heading>Historic Performance</Panel.Heading>
        <Panel.Body className="panel-body-scroll">
          <Grid fluid>
            <Row>
              <Col className="less-clutter" md={3}>
                <InputGroup bsSize="sm">
                  <FormControl type="number" min="0" placeholder="day"
                    value={this.state.day} onChange={this.updateDay} onKeyPress={this.handleKeyPress}></FormControl>
                </InputGroup>
              </Col>
              <Col className="less-clutter" md={4}>
                <InputGroup bsSize="sm">
                  <FormControl type="number" min="0" placeholder="sales"
                    value={this.state.sales} onChange={this.updateSales} onKeyPress={this.handleKeyPress}></FormControl>
                </InputGroup>
              </Col>
              <Col className="less-clutter" md={4}>
                <InputGroup bsSize="sm">
                  <FormControl type="number" min="0" placeholder="calls"
                    value={this.state.calls} onChange={this.updateCalls} onKeyPress={this.handleKeyPress}></FormControl>
                </InputGroup>
              </Col>
              <Col className="less-clutter" md={1}>
                <Button bsSize="sm" bsStyle="success" onClick={this.addRecord}>
                  <Glyphicon glyph="plus" />
                </Button>
              </Col>
            </Row>
            <hr />
            <Row>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Sales</th>
                      <th>Calls</th>
                      <th>
                        <Glyphicon glyph="trash" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    { salesList }
                    { grandTotal }
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
