import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import useData from '../../hooks/useData';
import ContentWrapper from '../../components/ContentWrapper';
import Container from '../../components/Container';
import Button from '../../components/Button';
import { Formik, Form } from 'formik';
import FormGroupInput from '../../components/FormGroupInput';
import Row from '../../components/Row';
import FormContext from '../../context/FormContext';
import AddPlacement from './AddPlacement';
import { Table } from '../../components/Table';
import PlacementDetails from './PlacementDetails';
import SeriesResultForm from './SeriesResultForm';
import axios from '../../axios';
import OverlaySpinner from '../../components/SpinnerOverlay';
import Spinner from '../../components/Spiner';
import Link from '../../components/Link';
import { MessageContext } from '../../context/MessageContext';

function Placement({ history, location }) {
  const [placements, getPlacement, addPlacement] = useData(
    'placement',
    ['person_id', 'competition_id'],
    'place'
  );

  const [competitions] = useData('competition');
  const parsedCompetitions =
    competitions &&
    competitions.reduce((prev, competition) => {
      if (competition.qualification_date)
        prev[competition.competition_id] = `${competition.name} (${
          competition.competition_date
        })`;
      else
        prev[competition.competition_id] = `[TEAM COMPETITION] ${
          competition.name
        } (${competition.competition_date})`;
      return prev;
    }, {});

  const [teamResults, getTeamResults] = useData('result', [], 'place');

  const [competitionData, setCompetitionData] = useState('');
  const [personData, setPersonData] = useState('');
  const [seriesData, setSeriesData] = useState('');

  const refetchPlacements = async () => {
    await getPlacement({ competition_id: competitionData });
    await getTeamResults({ competition_id: competitionData });
  };

  const { addMessage } = useContext(MessageContext);

  const finishCompetition = async () => {
    const resp = await axios.post(
      `/competition/finish-competition?competition_id=${competitionData}`
    );
    if (resp.status === 200) {
      addMessage(
        'Successfully finished Competition. Classification has been updated.',
        'success'
      );
    }
  };

  useEffect(
    () => {
      refetchPlacements();
    },
    [location.pathname !== '/placement']
  );

  const placementView = () => (
    <>
      <Container>
        {!competitions && <OverlaySpinner />}
        <Formik
          initialValues={{ competition_id: competitionData }}
          enableReinitialize={true}
          validate={async values => {
            await setCompetitionData(Number(values.competition_id));
            await getPlacement({ competition_id: values.competition_id });
            await getTeamResults({ competition_id: values.competition_id });
          }}
          validateOnBlur={false}
        >
          {({
            isSubmitting,
            errors,
            touched,
            handleBlur,
            handleChange,
            values
          }) => (
            <FormContext.Provider
              value={{
                handleBlur,
                handleChange,
                values,
                errors,
                touched
              }}
            >
              <Form>
                <Row>
                  <FormGroupInput
                    name="competition_id"
                    placeholder="competition (date)"
                    label="Choose Competition:"
                    options={parsedCompetitions}
                  />
                </Row>
                <Row>
                  <Button
                    color={competitionData !== '' ? 'info' : 'disabled'}
                    type="button"
                    onClick={() =>
                      competitionData !== '' && finishCompetition()
                    }
                  >
                    Finish Competition
                  </Button>
                </Row>
              </Form>
            </FormContext.Provider>
          )}
        </Formik>
      </Container>
      {teamResults && teamResults.length > 0 && (
        <>
          <Container>
            <h3>Teams Classification</h3>
            <Table noActions>
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Team</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {teamResults.map(result => (
                  <tr key={result.team_id}>
                    <td>{result.place}</td>
                    <td>
                      <Link to={`/team/${result.team_id}`}>{result.team}</Link>
                    </td>
                    <td>{result.points}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        </>
      )}
      <Container>
        {competitionData === '' ? (
          <p>choose competition from above</p>
        ) : placements === undefined ? (
          <Spinner />
        ) : placements.length === 0 && competitionData !== '' ? (
          <p>
            Couldn't find any ski jumper taking part in that competition, add
            one by button above{' '}
            <span role="img" aria-label="smile">
              😉
            </span>
          </p>
        ) : (
          <>
            <h3>Ski Jumpers Classification</h3>
            <Table single>
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Ski Jumper</th>
                  <th>Points</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {placements.map(
                  ({
                    person_id,
                    competition_id,
                    place,
                    first_name,
                    surname,
                    points
                  }) => (
                    <tr key={person_id}>
                      <td>{place}</td>
                      <td>
                        <Link
                          to={`/ski-jumper/${person_id}`}
                        >{`${first_name} ${surname}`}</Link>
                      </td>
                      <td>{points}</td>
                      <td>
                        <Button
                          color="info"
                          type="button"
                          onClick={async () => {
                            await setPersonData(person_id);
                            history.push(
                              `/placement/${competition_id}/${person_id}`
                            );
                          }}
                        >
                          <span role="img" aria-label="info">
                            🔍
                          </span>
                        </Button>
                        {/* <Button
                        onClick={() =>
                          deletePlacement({
                            competition_id,
                            person_id
                          })
                        }
                        color="danger"
                        type="button"
                      >
                        <span role="img" aria-label="delete">
                          ❌
                        </span>
                      </Button> */}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </>
  );

  return (
    <>
      <ContentWrapper>
        <Container blank>
          <h1>Placement</h1>
          {location.pathname === '/placement' ? (
            <Button
              color={competitionData !== '' ? 'info' : 'disabled'}
              onClick={() =>
                competitionData !== '' &&
                history.push('/placement/add-ski-jumper')
              }
            >
              Add Ski Jumper to Competition
            </Button>
          ) : (
            <Button color={'info'} onClick={() => history.push('/placement')}>
              back to Placement
            </Button>
          )}
        </Container>
        <Switch>
          <Route exact path="/placement" render={placementView} />
          <Route
            path="/placement/add-ski-jumper"
            render={() => (
              <AddPlacement
                competitionId={competitionData}
                addPlacement={addPlacement}
                placements={placements}
              />
            )}
          />
          <Route
            exact
            path="/placement/:competitionId/:skiJumperId"
            render={() => (
              <PlacementDetails
                competitionId={competitionData}
                personId={personData}
                setSeriesData={setSeriesData}
              />
            )}
          />
          <Route
            exact
            path="/placement/:competitionId/:skiJumperId/:seriesId"
            render={() => (
              <SeriesResultForm
                competitionId={competitionData}
                personId={personData}
                seriesId={seriesData}
              />
            )}
          />
        </Switch>
      </ContentWrapper>
    </>
  );
}

export default withRouter(Placement);
