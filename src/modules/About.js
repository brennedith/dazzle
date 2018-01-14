import React, { Component } from 'react'
import { FormGroup, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap'

class About extends Component {
  
  constructor(props) {
    
    super(props)
    
    this.state = {
      themes: ['Cerulean', 'Cosmo', 'Cyborg', 'Darkly', 'Flatly', 'Journal', 'Lumen', 'Paper', 'Readable', 'Sandstone', 'Simplex', 'Slate', 'Spacelab', 'Superhero', 'United', 'Yeti']
    }
    
    this.handleTheme = this.handleTheme.bind(this)
    this.handleTenure = this.handleTenure.bind(this)
    
  }
  
  handleTheme(e) {
    
    this.props.handleTheme(e.target.dataset.theme)
    
  }
  
  handleTenure(e) {
    
    this.props.handleTenure(e.target.dataset.tenure)
    
  }
  
  render() {
    
    let tenure = this.props.tenure === 'above60' ? 'Above 60 days' : 'Below 60 days'
    
    let themeItems = this.state.themes.map((theme, idx) => (
      <MenuItem eventKey={idx} key={idx} active={this.props.theme === theme} data-theme={theme} onClick={this.handleTheme}>
        { theme }
      </MenuItem>
    ))
    
    return (
      <div>
        <h3>Welcome to Dazzle</h3>
          <FormGroup>
            <ControlLabel>Tenure:</ControlLabel>
            &nbsp;
            <DropdownButton title={tenure} id="tenure">
              <MenuItem eventKey={1} active={this.props.tenure !== 'above60'} data-tenure="below60" onClick={this.handleTenure}>Below 60 days</MenuItem>
              <MenuItem eventKey={2} active={this.props.tenure === 'above60'} data-tenure="above60" onClick={this.handleTenure}>Above 60 days</MenuItem>
            </DropdownButton>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Theme:</ControlLabel>
            &nbsp;
            <DropdownButton title={this.props.theme} id="themes">
            { themeItems }
            </DropdownButton>
          </FormGroup>
      </div>
    )
    
  }
  
}

export default About
