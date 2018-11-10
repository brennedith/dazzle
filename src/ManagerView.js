import React, { Component } from 'react';
import {
  Grid,
  Row,
  Col,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';

import firebase from './modules/services/firebase.js';

class ManagerView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rosterCSV: ''
    };

    this.handleRosterCSV = this.handleRosterCSV.bind(this);
    this.updateRoster = this.updateRoster.bind(this);
    this.clearMetrics = this.clearMetrics.bind(this);
  }

  componentDidMount() {
    this.firebaseRef = firebase.database().ref('/users/');
    this.firebaseRef.once('value', snapshot => {
      let roster = snapshot.val();
      let rosterCSV = [];

      for (let user in roster) {
        rosterCSV.push(`${user},${roster[user]}`);
      }

      this.setState({
        rosterCSV: rosterCSV.join('\n')
      });
    });
  }

  handleRosterCSV(e) {
    this.setState({
      rosterCSV: e.target.value
    });
  }

  updateRoster() {
    if (this.state.rosterCSV !== '') {
      let rosterCSV = this.state.rosterCSV;
      let roster = {};

      rosterCSV = rosterCSV.split('\n');

      // eslint-disable-next-line
      rosterCSV.map((user, index) => {
        if (user.indexOf(',') !== -1) {
          user = user.split(',');
          roster[user[0]] = user[1];
          console.log(user);
        }
      });

      this.firebaseRef = firebase.database().ref('/users/');
      this.firebaseRef
        .set(roster)
        .then(data => alert('Roster updated.'))
        .catch(err => {
          alert('Error: please check the console for more information.');
          console.log(err);
        });
    }
  }

  clearMetrics() {
    this.firebaseRef = firebase.database().ref('/metrics/');
    this.firebaseRef
      .set({})
      .then(data => alert('Metrics cleared.'))
      .catch(err => {
        alert('Error: please check the console for more information.');
        console.log(err);
      });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={8} smHidden xsHidden>
            <h1>Dazzle</h1>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <FormGroup>
              <ControlLabel>Update Roster</ControlLabel>
              <FormControl
                value={this.state.rosterCSV}
                onChange={this.handleRosterCSV}
                componentClass="textarea"
                rows="10"
                placeholder="Please add the new roster in csv mode."
              />
            </FormGroup>
            <Button bsStyle="success" onClick={this.updateRoster}>
              Update Roster
            </Button>
            <hr />
            <ControlLabel>Manage Metrics</ControlLabel>
            <br />
            <Button bsStyle="danger" onClick={this.clearMetrics}>
              Clear Metrics
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default ManagerView;
