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
            <Col className="less-clutter" md={6} sm={6} xs={6}>
              <Stopwatch />
            </Col>
            <Col className="less-clutter" md={6} sm={6} xs={6}>
              <Stopwatch />
            </Col>
          </Row>
        </Grid>
      </Panel.Body>
    </Panel>
  )
  
}

export default StopwatchsPanel
