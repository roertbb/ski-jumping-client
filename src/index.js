import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Tournament from './pages/tournament/TournamentPage';
import { ThemeProvider } from 'styled-components';
import theme from './style/theme';
import GlobalStyle from './style/GlobalStyle';
import Content from './components/Content';
import Side from './components/Side';
import SkiJumpingHill from './pages/skiJumpingHill/SkiJumpingHillPage';

const App = function() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <BrowserRouter>
          <Content>
            <Side />
            <Switch>
              <Route path="/" exact component={Tournament} />
              <Route path="/tournament" component={Tournament} />
              <Route path="/ski-jumping-hill" component={SkiJumpingHill} />
            </Switch>
          </Content>
        </BrowserRouter>
      </>
    </ThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
