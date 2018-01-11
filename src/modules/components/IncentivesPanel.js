import React from 'react'
import { Grid, Row, Col, Panel, FormControl, InputGroup, Tooltip, OverlayTrigger } from 'react-bootstrap'

import BonusService from '../services/bonus'

function IncentivesPanel (props) {
  let bonus = BonusService.calc(props.level, props.tenure, props.conversion)
  
  return (
    <Panel>
      <Panel.Heading>Incentives</Panel.Heading>
      <Panel.Body>
        <Grid fluid>
          <Row>
            <Col md={6}>
              <InputGroup bsSize="sm">
                <InputGroup.Addon>Actual</InputGroup.Addon>
                <FormControl componentClass="span">${ (props.revenue * bonus.current).toFixed(2) }</FormControl>
              </InputGroup>
            </Col>
            <Col md={6}>
              <OverlayTrigger placement="top" overlay={
                <Tooltip id="max">Max: ${ (props.revenue * bonus.max).toFixed(2) }</Tooltip>
              }>
                <InputGroup bsSize="sm">
                  <InputGroup.Addon>Next</InputGroup.Addon>
                  <FormControl componentClass="span">${ (props.revenue * bonus.next).toFixed(2) }</FormControl>
                </InputGroup>
              </OverlayTrigger>
            </Col>
          </Row>
        </Grid>
      </Panel.Body>
    </Panel>
  )
}

export default IncentivesPanel