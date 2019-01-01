import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import useDate from '../../hooks/useData';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import TeamCompetitionForm from './TeamCompetitionForm';
import TeamCompetitionSearchForm from './TeamCompetitionSearchPage';
import TeamCompetitionDetails from './TeamCompetitionDetails';

function TeamCompetition(props) {
  const [
    teamCompetitions,
    getTeamComp,
    addTeamComp,
    patchTeamComp,
    deleteTeamComp,
    message
  ] = useDate('team-competition', 'competition_id');

  const [modeElem, setModElem] = useState(null);

  const updateTeamComp = competition => {
    setModElem(competition);
    props.history.push('/team-competition/modify');
  };

  const searchView = () => (
    <>
      <Container>
        <TeamCompetitionSearchForm get={getTeamComp} />
      </Container>
      <Container>
        <Table
          info
          route={'team-competition'}
          labels={['Date', 'Tournament', 'Hill']}
          values={['competition_date', 'tournament_id', 'ski_jumping_hill_id']}
          items={teamCompetitions}
          itemsKey={'competition_id'}
          del={deleteTeamComp}
          update={updateTeamComp}
        />
      </Container>
    </>
  );

  const modifyView = () => (
    <Container>
      <TeamCompetitionForm
        add={addTeamComp}
        patch={patchTeamComp}
        modifyValue={modeElem}
      />
    </Container>
  );

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Team Competitions</h1>
          <Button
            color="info"
            onClick={() => {
              setModElem(null);
              props.history.push(
                props.location.pathname === '/team-competition'
                  ? '/team-competition/add'
                  : '/team-competition'
              );
            }}
          >
            {props.location.pathname === '/team-competition'
              ? 'Add Team Competition'
              : 'back to Search'}
          </Button>
        </Container>
        <Switch>
          <Route exact path="/team-competition" render={searchView} />
          <Route path="/team-competition/add" render={modifyView} />
          <Route path="/team-competition/modify" render={modifyView} />
          <Route
            path="/team-competition/:id"
            render={() => <TeamCompetitionDetails />}
          />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(TeamCompetition);
