import React, { Component } from 'react'
import { Grid, Row, Col, Badge, Table } from 'react-bootstrap'

import firebase from './modules/services/firebase.js'

/* import modules and components */
import StaminaBar from './modules/components/StaminaBar'

class SupervisorView extends Component {

  constructor(props) {

    super(props)

    this.state = {
      metrics: {}
    }

  }

  componentWillMount() {

    this.firebaseRef = firebase.database().ref('/metrics/')
    this.firebaseRef.on('value', (snapshot) => {

      this.setState({
        metrics: snapshot.val()
      })

    })

  }

  statusClass(conversion) {
    return conversion >= 40 ? 'success' :
           conversion >= 35 ? 'warning' : 'danger'
  }

  render() {
    
    let metrics = this.state.metrics
    let database = []

    let sales = 0
    let calls = 0
    let conversion = 0

    for(let result in metrics) {
      sales += parseInt(metrics[result].s, 10)
      calls += parseInt(metrics[result].c, 10)

      database.push({
        login: result,
        sales: parseInt(metrics[result].s, 10),
        calls: parseInt(metrics[result].c, 10)
      })
    }

    conversion = calls === 0 ? 100 : (sales / calls * 100)
    
    let results = database.map((result, index) => {

      let conversion = result.calls === 0 ? 100 : (result.sales / result.calls * 100)
    
      return (
        <tr key={index}>
          <td>{ result.login }</td>
          <td>{ result.sales }</td>
          <td>{ result.calls }</td>
          <td><Badge className={`alert-${this.statusClass(conversion)}`}>{ conversion.toFixed(2) }%</Badge></td>
        </tr>
      )
    
    })

    return(
      <Grid fluid>
        <Row>
          <StaminaBar now={conversion} bsStyle={this.statusClass(conversion)} />
        </Row>
        <Row>
          <Col md={8} smHidden xsHidden>
            <h1>Dazzle</h1>
          </Col>
          <Col md={4}>
            <h2 className="center">Conversion <Badge className={`alert-${this.statusClass(conversion)}`}>{ conversion.toFixed(2) }%</Badge></h2>
          </Col>
        </Row>
        <hr />
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <td>Login</td>
                <td>Sales</td>
                <td>Calls</td>
                <td>Conversion</td>
              </tr>
            </thead>
            <tbody>
              { results }
            </tbody>
          </Table>
        </Row>
      </Grid>
    )

  }

}

export default SupervisorView
