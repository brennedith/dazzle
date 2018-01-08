import React from 'react'
import { ProgressBar, Tooltip, OverlayTrigger } from 'react-bootstrap'

function StaminaBar (props) {
  let conversion = props.now
  let performance = Math.min(conversion * 100 / 45, 100)
  
  let statusClass = conversion >= 40 ? 'success' :
                    conversion >= 30 ? 'warning' : 'danger'

  return (
    <OverlayTrigger placement="bottom" overlay={
      <Tooltip id="stamina">Stamina is the ability to sustain prolonged physical or mental effort.</Tooltip>
    }>
      <ProgressBar label="stamina" striped active now={performance} bsStyle={statusClass} />
    </OverlayTrigger>
  )
}

export default StaminaBar