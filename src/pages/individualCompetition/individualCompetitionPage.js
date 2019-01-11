import React, { useState } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import useData from '../../hooks/useData';
import { Table } from '../../components/Table';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import IndividualCompetitionForm from './individualCompetitionForm';
import IndividualCompetitionSearchForm from './individualCompetitionSearchFrom';
import IndividualCompetitionDetails from './IndividualCompetitionDetails';
import Spinner from '../../components/Spiner';
import Link from '../../components/Link';

function IndividualCompetition(props) {
  const [
    individualCompetitions,
    getIndComp,
    addIndComp,
    patchIndComp,
    deleteIndComp
  ] = useData('individual-competition', 'competition_id');

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

  const [modElem, setModElem] = useState(null);

  const updateIndComp = competition => {
    setModElem(competition);
    props.history.push('/individual-competition/modify');
  };

  const searchView = () => (
    <>
      <Container>
        <IndividualCompetitionSearchForm get={getIndComp} />
      </Container>
      <Container>
        <h3>Search results</h3>
        {!individualCompetitions || !parsedHills || !parsedTournaments ? (
          <Spinner />
        ) : individualCompetitions.length === 0 ? (
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
              {individualCompetitions.map(item => (
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
                          `/individual-competition/${item.competition_id}`
                        )
                      }
                    >
                      <span role="img" aria-label="info">
                        🔍
                      </span>
                    </Button>
                    <Button
                      onClick={() => updateIndComp(item)}
                      color="edit"
                      type="button"
                    >
                      <span role="img" aria-label="update">
                        ✍
                      </span>
                    </Button>
                    <Button
                      onClick={() =>
                        deleteIndComp({ competition_id: item.competition_id })
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
      <IndividualCompetitionForm
        add={addIndComp}
        patch={patchIndComp}
        modifyValue={modElem}
      />
    </Container>
  );

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Individual Competitions</h1>
          <Button
            color="info"
            onClick={() => {
              setModElem(null);
              props.history.push(
                props.location.pathname === '/individual-competition'
                  ? '/individual-competition/add'
                  : '/individual-competition'
              );
            }}
          >
            {props.location.pathname === '/individual-competition'
              ? 'Add Individual Competition'
              : 'back to Search'}
          </Button>
        </Container>
        <Switch>
          <Route exact path="/individual-competition" render={searchView} />
          <Route path="/individual-competition/add" render={modifyView} />
          <Route path="/individual-competition/modify" render={modifyView} />
          <Route
            path="/individual-competition/:id"
            render={() => <IndividualCompetitionDetails />}
          />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(IndividualCompetition);
