import React, { Component } from 'react'
import { FormControl, InputGroup, Button, Glyphicon } from 'react-bootstrap'

class Stopwatch extends Component {
  
  constructor(props) {
    
    super(props)
    
    this.state = {
      status: false,
      seconds: 0
    }
    
    this.timer = null
    
    this.toggleStopwatch = this.toggleStopwatch.bind(this)
    this.stopStopwatch = this.stopStopwatch.bind(this)
    
  }

  toggleStopwatch() {
    
    if(!this.state.status) {
      this.timer = setInterval(() => this.setState(prevState => ({
        seconds: prevState.seconds + 1
      })), 1000)
      this.setState(prevState => ({
        status: !prevState.status
      }))
    } else {
      clearInterval(this.timer)
      this.timer = null
      this.setState(prevState => ({
        status: !prevState.status
      }))
    }
    
  }
  
  stopStopwatch() {
    
    if(this.state.status) {
      this.toggleStopwatch()
    }
    this.setState({
      seconds: 0
    })
    
  }
  
  render() {
  
    function doubleDigits(time) {
      return ("0" + time).slice(-2)
    }
    
    function formatTime(time) {
      let seconds = doubleDigits(time % 60)
      let minutes = doubleDigits(parseInt(time / 60 % 60, 10))
      let hours = doubleDigits(parseInt(time / 3600, 10))
      
      return `${hours}:${minutes}:${seconds}`
    }

    let statusClass = this.state.status ? 'warning' : 'success'
    let statusIcon = this.state.status ? 'pause' : 'play'
    
    return (
      <InputGroup bsSize="md">
        <InputGroup.Button>
          <Button bsStyle="danger" onClick={this.stopStopwatch}>
            <Glyphicon glyph="stop" />
          </Button>
        </InputGroup.Button>
        <FormControl componentClass="span">
          <strong>{ formatTime(this.state.seconds) }</strong>
        </FormControl>
        <InputGroup.Button>
          <Button bsStyle={statusClass} onClick={this.toggleStopwatch}>
            <Glyphicon glyph={statusIcon} />
          </Button>
        </InputGroup.Button>
      </InputGroup>
    )
    
  }
  
}

export default Stopwatch
