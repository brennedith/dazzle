import React from 'react'
import { Grid, Row, Col, Panel } from 'react-bootstrap'

import Stopwatch from './Stopwatch'

function StopwatchsPanel (props) {
  
  return (
    <Panel>
      <Panel.Heading>Stopwatch</Panel.Heading>
      <Panel.Body>
        <Grid fluid>
          <Row>
            <Col md={4}>
              <Stopwatch />
            </Col>
            <Col md={4}>
              <Stopwatch />
            </Col>
            <Col md={4}>
              <Stopwatch />
            </Col>
          </Row>
        </Grid>
      </Panel.Body>
    </Panel>
  )
  
}

export default StopwatchsPanel
