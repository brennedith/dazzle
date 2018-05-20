import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import AgentView from './AgentView'
import SupervisorView from './SupervisorView'
import ManagerView from './ManagerView'

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={AgentView} />
      <Route path="/realtime" component={SupervisorView} />
      <Route path="/manage" component={ManagerView} />
    </div>
  </Router>,
  document.getElementById('root')
)
