import React, { useState } from 'react';
import { Switch, Route, withRouter, Link } from 'react-router-dom';
import useData from '../../hooks/useData';
import { Table } from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import TeamCompetitionForm from './TeamCompetitionForm';
import TeamCompetitionSearchForm from './TeamCompetitionSearchPage';
import TeamCompetitionDetails from './TeamCompetitionDetails';
import Spinner from '../../components/Spiner';

function TeamCompetition(props) {
  const [
    teamCompetitions,
    getTeamComp,
    addTeamComp,
    patchTeamComp,
    deleteTeamComp
  ] = useData('team-competition', 'competition_id');

  const [hills] = useData('ski-jumping-hill');
  const parsedHills =
    hills &&
    hills.reduce((prev, hill) => {
      prev[hill.ski_jumping_hill_id] = hill.name;
      return prev;
    }, {});

  const [tournaments] = useData('tournament');
  const parsedTournaments =
    tournaments &&
    tournaments.reduce((prev, tournament) => {
      prev[tournament.tournament_id] = tournament.name;
      return prev;
    }, {});

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
        <h3>Search results</h3>
        {!teamCompetitions || !parsedHills || !parsedTournaments ? (
          <Spinner />
        ) : teamCompetitions.length === 0 ? (
          <p>
            Couldn't found results with such parameters{' '}
            <span role="img" aria-label="thinking">
              🤔
            </span>
          </p>
        ) : (
          <Table info>
            <thead>
              <tr>
                <th>Date</th>
                <th>Hill</th>
                <th>Tournament</th>
                <th>
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {teamCompetitions.map(item => (
                <tr key={item.competition_id}>
                  <td>{item.competition_date}</td>
                  <td>
                    {parsedHills && (
                      <Link
                        to={`/ski-jumping-hill/${item.ski_jumping_hill_id}`}
                      >
                        {parsedHills[item.ski_jumping_hill_id]}
                      </Link>
                    )}
                  </td>
                  <td>
                    {parsedTournaments && (
                      <Link to={`/tournament/${item.tournament_id}`}>
                        {parsedTournaments[item.tournament_id]}
                      </Link>
                    )}
                  </td>
                  <td>
                    <Button
                      color="info"
                      type="button"
                      onClick={() =>
                        props.history.push(
                          `/team-competition/${item.competition_id}`
                        )
                      }
                    >
                      <span role="img" aria-label="info">
                        🔍
                      </span>
                    </Button>
                    <Button
                      onClick={() => updateTeamComp(item)}
                      color="edit"
                      type="button"
                    >
                      <span role="img" aria-label="update">
                        ✍
                      </span>
                    </Button>
                    <Button
                      onClick={() =>
                        deleteTeamComp({ competition_id: item.competition_id })
                      }
                      color="danger"
                      type="button"
                    >
                      <span role="img" aria-label="delete">
                        ❌
                      </span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
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
