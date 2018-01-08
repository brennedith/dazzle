import React, { Component } from 'react'
import { DropdownButton, MenuItem } from 'react-bootstrap'

class About extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      themes: ['Default', 'Cerulean', 'Cosmo', 'Cyborg', 'Darkly', 'Flaty', 'Journal', 'Lumen', 'Paper', 'Readable', 'Sandstone', 'Simplex', 'Slate', 'Spacelab', 'Superhero', 'United', 'Yeti']
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
        <h3>Welcome to Dazzle</h3>
        <p>
          Please choose a theme:
          &nbsp;
          <DropdownButton title={this.props.theme} id="themes">
          { themeItems }
          </DropdownButton>
        </p>
      </div>
    )
  }
  
}

export default About
