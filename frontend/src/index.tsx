import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Inicio from './components/index';
import Motos from './components/projects/motos/motos'
import Trivia from './components/projects/trivia/trivia'
import RoomChat from './components/projects/room-chat/indexChat';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Inicio} />
        <Route exact path='/motos' component={Motos} />
        <Route exact path='/trivia' component={Trivia} />
        <Route exact path='/chatroom' component={RoomChat} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
