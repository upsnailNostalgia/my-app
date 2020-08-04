import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import MyForm from './MyForm.js'
import MyLogin from './MyLogin.js'
import RetMsg from './RetMsg.js'
import Thanks from './Thanks.js'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pop_repos: [],
      requirements: [
        { "label": "java7以下（包括7）" },
        { "label": "java8" },
        { "label": "python2" },
        { "label": "python3" },
        { "label": "git" },
        { "label": "nginx" }
      ],
      ram_size: 0,
      disk_size: 0,
      selected_requirements: [],
      selected_repos: [],
      message: [],
      isActive: true,
    }
  }

  render() {
    return (
      <div>
        <Router>
          <Route path='/' exact component={MyLogin}></Route>
          <Route path='/apply' exact component={MyForm}></Route>
          <Route path='/free' exact component={RetMsg}></Route>
          <Route path='/thanks' exact component={Thanks}></Route>
        </Router>
      </div>
    )
  }
}

export default App;
