import React, { Component } from 'react'
import { Grid, Row, Col, Badge, Table } from 'react-bootstrap'

import firebase from './modules/services/firebase.js'

/* import modules and components */
import StaminaBar from './modules/components/StaminaBar'

class SupervisorView extends Component {

  constructor(props) {

    super(props)

    this.state = {
      sales: 0,
      calls: 0,
      metrics: [],
      users: {}
    }

  }

  componentWillMount() {

    this.firebaseRef = firebase.database().ref('/users/')
    this.firebaseRef.once('value', (snapshot) => {
      
      this.setState({
        users: snapshot.val()
      })
      
    })
    
    this.firebaseRef = firebase.database().ref('/metrics/')
    this.firebaseRef.on('value', (snapshot) => {
      
      let metrics = snapshot.val()
      let results = []
      let sales = 0
      let calls = 0
    
      for(let result in metrics) {
        sales += parseInt(metrics[result].s, 10)
        calls += parseInt(metrics[result].c, 10)
    
        results.push({
          login: result,
          sales: parseInt(metrics[result].s, 10),
          calls: parseInt(metrics[result].c, 10)
        })
      }

      this.setState({
        sales: sales,
        calls: calls,
        metrics: results
      })
      
    })
    
  }
  
  statusClass(conversion) {
    return conversion >= 40 ? 'success' :
    conversion >= 35 ? 'warning' : 'danger'
  }
  
  render() {
    
    let metrics = this.state.metrics
    let users = this.state.users
    let sales = this.state.sales
    let calls = this.state.calls

    let conversion = calls === 0 ? 100 : (sales / calls * 100)
    
    let results = metrics.map((result, index) => {

      let conversion = result.calls === 0 ? 100 : (result.sales / result.calls * 100)
    
      return (
        <tr key={index}>
          <td>{ result.login }</td>
          <td>{ users[result.login] }</td>
          <td>{ result.sales }</td>
          <td>{ result.calls }</td>
          <td className={`alert-${this.statusClass(conversion)}`}><strong>{ conversion.toFixed(2) }%</strong></td>
        </tr>
      )
    
    })

    let totals = (
      <tr>
        <td></td>
        <td></td>
        <td><strong>{ sales }</strong></td>
        <td><strong>{ calls }</strong></td>
        <td></td>
      </tr>
    )

    return(
      <Grid>
        <Row className="supervisorStamina">
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
        <Row>
          <Table className="center" striped bordered hover>
            <thead>
              <tr>
                <td>Login</td>
                <td>Name</td>
                <td>Sales</td>
                <td>Calls</td>
                <td>Conversion</td>
              </tr>
            </thead>
            <tbody>
              { results }
              { totals }
            </tbody>
          </Table>
        </Row>
      </Grid>
    )

  }

}

export default SupervisorView
