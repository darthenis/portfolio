import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Inicio from './components/index';
import Motos from './components/projects/motos'
import Trivia from './components/projects/trivia/trivia'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Inicio} />
        <Route exact path='/motos' component={Motos} />
        <Route exact path='/trivia' component={Trivia} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
