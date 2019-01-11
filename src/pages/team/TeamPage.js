import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import useDate from '../../hooks/useData';
import Table from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import TeamForm from './TeamForm';
import TeamSearchForm from './TeamSearchForm';
import TeamDetails from './TeamDetails';

function Team(props) {
  const [teams, getTeams, addTeams, patchTeams, deleteTeams] = useDate('team');

  const [modElem, setModElem] = useState(null);

  const updateTeam = team => {
    setModElem(team);
    props.history.push('/team/modify');
  };

  const searchView = () => (
    <>
      <Container>
        <TeamSearchForm get={getTeams} />
      </Container>
      <Container>
        <Table
          info
          route={'team'}
          labels={['Classification', 'Team Name', 'Classification Points']}
          values={['classification', 'team', 'classification_points']}
          items={teams}
          itemsKey={'team_id'}
          del={deleteTeams}
          update={updateTeam}
        />
      </Container>
    </>
  );

  const modifyView = () => (
    <Container>
      <TeamForm add={addTeams} patch={patchTeams} modifyValue={modElem} />
    </Container>
  );

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Team</h1>
          <Button
            color="info"
            onClick={() => {
              setModElem(null);
              props.history.push(
                props.location.pathname === '/team' ? '/team/add' : '/team'
              );
            }}
          >
            {props.location.pathname === '/team'
              ? 'Add Team'
              : 'back to Search'}
          </Button>
        </Container>
        <Switch>
          <Route exact path="/team" render={searchView} />
          <Route path="/team/add" render={modifyView} />
          <Route path="/team/modify" render={modifyView} />
          <Route path="/team/:id" render={() => <TeamDetails />} />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(Team);
