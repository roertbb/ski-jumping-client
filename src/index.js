import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Tournament from './pages/tournament/TournamentPage';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import GlobalStyle from './style/GlobalStyle';
import Content from './components/Content';
import Side from './components/Side';
import SkiJumpingHill from './pages/skiJumpingHill/SkiJumpingHillPage';
import Team from './pages/team/TeamPage';
import SkiJumper from './pages/skiJumper/SkiJumperPage';
import Coach from './pages/coach/CoachPage';
import IndividualCompetition from './pages/individualCompetition/individualCompetitionPage';
import TeamCompetition from './pages/teamCompetition/TeamCompetitionPage';
import Placement from './pages/placement/PlacementPage';
import { MessageContextProvider } from './context/MessageContext';

const App = function() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Content>
            <MessageContextProvider>
              <Side />
              <Switch>
                <Route path="/" exact component={Tournament} />
                <Route path="/tournament" component={Tournament} />
                <Route path="/ski-jumping-hill" component={SkiJumpingHill} />
                <Route path="/team" component={Team} />
                <Route path="/ski-jumper" component={SkiJumper} />
                <Route path="/coach" component={Coach} />
                <Route path="/placement" component={Placement} />
                <Route
                  path="/individual-competition"
                  component={IndividualCompetition}
                />
                <Route path="/team-competition" component={TeamCompetition} />
              </Switch>
            </MessageContextProvider>
          </Content>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
