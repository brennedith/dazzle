import React from 'react'
import { Grid, Row, Col, Panel, FormControl, InputGroup } from 'react-bootstrap'

function IncentivesPanel (props) {

    return (
      <Panel>
        <Panel.Heading>Incentives by CPH</Panel.Heading>
        <Panel.Body>
          <Grid fluid>
            <Row>
              <Col md={3}>
                <InputGroup bsSize="lg">
                  <InputGroup.Addon>3.0</InputGroup.Addon>
                  <FormControl componentClass="span">${ props.sales * 18 }</FormControl>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup bsSize="lg">
                  <InputGroup.Addon>3.5</InputGroup.Addon>
                  <FormControl componentClass="span">${ props.sales * 24 }</FormControl>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup bsSize="lg">
                  <InputGroup.Addon>4.0</InputGroup.Addon>
                  <FormControl componentClass="span">${ props.sales * 26 }</FormControl>
                </InputGroup>
              </Col>
              <Col md={3}>
                <InputGroup bsSize="lg">
                  <InputGroup.Addon>4.5</InputGroup.Addon>
                  <FormControl componentClass="span">${ props.sales * 28 }</FormControl>
                </InputGroup>
              </Col>
            </Row>
          </Grid>
        </Panel.Body>
        <Panel.Footer>
          Remember this is only an estimate, real feedback can only be provided with official reports.
        </Panel.Footer>
      </Panel>
    )

  }

export default IncentivesPanel
