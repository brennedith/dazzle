import React, { Component } from 'react'
import { FormGroup, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap'

class About extends Component {
  
  constructor(props) {
    
    super(props)
    
    this.state = {
      themes: ['Cerulean', 'Cosmo', 'Cyborg', 'Darkly', 'Flatly', 'Journal', 'Lumen', 'Paper', 'Readable', 'Sandstone', 'Simplex', 'Slate', 'Spacelab', 'Superhero', 'United', 'Yeti']
    }
    
    this.handleTheme = this.handleTheme.bind(this)
    
  }
  
  handleTheme(e) {
    
    this.props.handleTheme(e.target.dataset.theme)
    
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
