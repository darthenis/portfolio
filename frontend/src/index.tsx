import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Inicio from './components/index';
import Motos from './components/projects/motos/motos'
import Trivia from './components/projects/trivia/trivia'
import RoomChat from './components/projects/room-chat/indexChat';
import RoleTools from './components/projects/Roletools/roletools';
import UserPage from './components/projects/Roletools/userPage'
import Welcome from './components/projects/Roletools/elements/login/confirmationWelcome';
import MasterState from './components/projects/Roletools/elements/section/match/contextMatch/Master/masterState';
import PlayerState from './components/projects/Roletools/elements/section/match/contextMatch/Player/playerState';
import NavigationState from './components/projects/Roletools/navegation/navigationState'
import UserState from './components/projects/Roletools/User/userState'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Inicio} />
        <Route exact path='/motos' component={Motos} />
        <Route exact path='/trivia' component={Trivia} />
        <Route exact path='/chatroom' component={RoomChat} />
        <Route exact path='/roletools/confirm/:confirmation' component={Welcome} />
        <Route exact path='/roletools/user' component={UserPage} />
        <Route exact path='/roletools'> 

          <UserState>

                <NavigationState> 

                           <RoleTools/>

                </NavigationState>

          </UserState>

                </Route>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
