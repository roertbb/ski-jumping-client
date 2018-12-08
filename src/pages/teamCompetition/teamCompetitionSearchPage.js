import React from 'react';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormGroupInput from '../../components/FormGroupInput';
import FormContext from '../../context/FormContext';

function TeamCompetitionSearchForm({ get }) {
  const [tournaments] = useDate('tournament');
  const parsedTournament = tournaments.reduce((prev, tournament) => {
    prev[tournament.tournament_id] = tournament.name;
    return prev;
  }, {});

  const [skiJumpingHills] = useDate('ski-jumping-hill');
  const parsedHills = skiJumpingHills.reduce((prev, hill) => {
    prev[hill.ski_jumping_hill_id] = hill.name;
    return prev;
  }, {});

  const initialValues = {
    competition_date_from: '',
    competition_date_to: '',
    start_gate_from: '',
    start_gate_to: '',
    tournament_id: '',
    hill_id: ''
  };

  const clearFilters = async resetForm => {
    resetForm();
    await get();
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        const parameters = {};
        for (const value in values) {
          if (values[value] !== '') parameters[value] = values[value];
        }
        await get(parameters);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm, handleBlur, handleChange, values }) => (
        <FormContext.Provider value={{ handleBlur, handleChange, values }}>
          <Form>
            <h3>Search Team Competitions</h3>
            <Row>
              <FormGroupInput
                range
                date
                name="competition_date"
                type="date"
                label="Date:"
              />
              <FormGroupInput
                range
                name="start_gate"
                type="text"
                placeholder="competition start gate"
                label="Start Gate:"
              />
            </Row>
            <Row>
              <FormGroupInput
                name="tournament_id"
                placeholder="competition tournament"
                label="Tournament:"
                options={parsedTournament}
              />
              <FormGroupInput
                name="hill_id"
                placeholder="ski jumping hill"
                label="Ski Jumping Hill:"
                options={parsedHills}
              />
            </Row>

            <Row>
              <Button color="info" type="submit" disabled={isSubmitting}>
                Search
              </Button>
              <Button
                color="info"
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  clearFilters(resetForm);
                }}
              >
                Clear filters
              </Button>
            </Row>
          </Form>
        </FormContext.Provider>
      )}
    </Formik>
  );
}

export default TeamCompetitionSearchForm;
