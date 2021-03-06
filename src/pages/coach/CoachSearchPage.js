import React from 'react';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormGroupInput from '../../components/FormGroupInput';
import FormContext from '../../context/FormContext';
import FormGroup from '../../components/FormGroup';
import OverlaySpinner from '../../components/SpinnerOverlay';

function CoachSearchForm({ get }) {
  const [teams] = useDate('team');
  const parsedTeam =
    teams &&
    teams.reduce((prev, team) => {
      prev[team.team_id] = team.team;
      return prev;
    }, {});

  const initialValues = {
    first_name: '',
    surname: '',
    birth_date_from: '',
    birth_date_to: '',
    team_id: '',
    nationality: ''
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
            {!teams && <OverlaySpinner />}
            <h3>Search Coach</h3>
            <Row>
              <FormGroupInput
                name="first_name"
                type="text"
                placeholder="coach first name"
                label="Firstname:"
              />
              <FormGroupInput
                name="surname"
                type="text"
                placeholder="coach surname"
                label="Surname:"
              />
            </Row>
            <Row>
              <FormGroupInput
                range
                date
                name="birth_date"
                type="date"
                label="Birthdate:"
              />
              <FormGroupInput
                name="team_id"
                placeholder="coach team"
                label="Team:"
                options={parsedTeam}
              />
            </Row>
            <Row>
              <FormGroupInput
                name="nationality"
                type="text"
                placeholder="coach nationality"
                label="Nationality:"
              />
              <FormGroup />
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

export default CoachSearchForm;
