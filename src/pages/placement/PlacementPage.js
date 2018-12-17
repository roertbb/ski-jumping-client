import React, { useState, useEffect } from 'react';
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

function Placement() {
  const [
    placements,
    getPlacement,
    addPlacement,
    _,
    deletePlacement,
    message
  ] = useData('placement', ['ski_jumper_id', 'competition_id'], 'place');

  const [competitions] = useData('competition');
  const parsedCompetitions = competitions.reduce((prev, competition) => {
    prev[competition.competition_id] = `${competition.name} (${
      competition.competition_date
    })`;
    return prev;
  }, {});

  const [competitionData, setCompetitionData] = useState('');
  const [personData, setPersonData] = useState('');
  const [seriesData, setSeriesData] = useState('');
  const [view, setView] = useState('placement');

  const refetchPlacements = async () => {
    await getPlacement({ competition_id: competitionData });
  };

  const finishCompetition = async () => {
    const resp = await axios.post(
      `/competition/finish-competition?competition_id=${competitionData}`
    );
    console.log(resp);
  };

  useEffect(
    () => {
      refetchPlacements();
    },
    [view === 'placement']
  );

  let renderedView = '';
  if (view === 'placement') {
    renderedView = (
      <>
        <Container blank>
          <h1>Placement</h1>
          <Button
            color={competitionData !== '' ? 'info' : 'disabled'}
            onClick={() => competitionData !== '' && setView('add_placement')}
          >
            Add Ski Jumper to Competition
          </Button>
        </Container>
        <Container>
          <Formik
            initialValues={{ competition_id: competitionData }}
            enableReinitialize={true}
            validate={async values => {
              await setCompetitionData(Number(values.competition_id));
              await getPlacement({ competition_id: values.competition_id });
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
        {/* render team results if team competition */}
        <Container>
          {competitionData === '' ? (
            <p>choose competition from above</p>
          ) : placements.length === 0 ? (
            <p>
              Couldn't find any ski jumper taking part in that competition, add
              one by button above 😉
            </p>
          ) : (
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
                        <p>{`${first_name} ${surname}`}</p>
                      </td>
                      <td>{points}</td>
                      <td>
                        <Button
                          color="info"
                          type="button"
                          onClick={async () => {
                            await setPersonData(person_id);
                            await setView('placement_details');
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
          )}
        </Container>
      </>
    );
  } else if (view === 'add_placement') {
    renderedView = (
      <AddPlacement
        competitionId={competitionData}
        addPlacement={addPlacement}
        placements={placements}
        setView={setView}
      />
    );
  } else if (view === 'placement_details') {
    renderedView = (
      <PlacementDetails
        competitionId={competitionData}
        personId={personData}
        setView={setView}
        setSeriesData={setSeriesData}
      />
    );
  } else if (view === 'edit_series') {
    renderedView = (
      <SeriesResultForm
        competitionId={competitionData}
        personId={personData}
        seriesId={seriesData}
        setView={setView}
      />
    );
  }
  return (
    <>
      <ContentWrapper>{renderedView}</ContentWrapper>
    </>
  );
}

export default Placement;
