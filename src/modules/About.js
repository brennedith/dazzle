import React, { Component } from 'react'
import { Row, Col, Button, FormGroup, FormControl, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap'

class About extends Component {
  
  constructor(props) {
    
    super(props)
    
    this.state = {
      themes: ['Cerulean', 'Cosmo', 'Cyborg', 'Darkly', 'Flatly', 'Journal', 'Lumen', 'Paper', 'Readable', 'Sandstone', 'Simplex', 'Slate', 'Spacelab', 'Superhero', 'United', 'Yeti']
    }
    
    this.handleLogin = this.handleLogin.bind(this)
    this.handleTheme = this.handleTheme.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    
  }

  handleLogin(e) {

    this.props.handleLogin(e.target.value)

  }
  
  handleTheme(e) {
    
    this.props.handleTheme(e.target.dataset.theme)
    
  }

  handleKeyPress(e) {
    
    if(e.charCode === 13) {
      this.props.handleSignin()
    }
    
  }
  
  render() {
        
    let themeItems = this.state.themes.map((theme, idx) => (
      <MenuItem eventKey={idx} key={idx} active={this.props.theme === theme} data-theme={theme} onClick={this.handleTheme}>
        { theme }
      </MenuItem>
    ))
    
    return (
      <div>
        <h3><small>Dazzle: to impress deeply; astonish with delight.</small></h3>
        <br />
        <Row className="center">
          <Col mdOffset={5} md={2}>
            <FormGroup>
              <ControlLabel>Theme:</ControlLabel>
              &nbsp;
              <DropdownButton title={this.props.theme} id="themes">
              { themeItems }
              </DropdownButton>
            </FormGroup>
            <hr />
            <FormGroup>
              <ControlLabel>Login id</ControlLabel>
              &nbsp;
              <FormControl type="number" min="100000" max="200000"
              value={this.props.login} onChange={this.handleLogin} onKeyPress={this.handleKeyPress} />
            </FormGroup>
            <Button bsStyle="success" onClick={this.props.handleSignin}>Connect</Button>
          </Col>
        </Row>
      </div>
    )
    
  }
  
}

export default About
