import React from 'react';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormGroupInput from '../../components/FormGroupInput';
import FormContext from '../../context/FormContext';
import FormGroup from '../../components/FormGroup';

function SkiJumperSearchForm({ get }) {
  const [teams] = useDate('team');
  const parsedTeam = teams.reduce((prev, team) => {
    prev[team.team_id] = team.team;
    return prev;
  }, {});

  const initialValues = {
    first_name: '',
    surname: '',
    birth_date_from: '',
    birth_date_to: '',
    team_id: '',
    fis_id: '',
    active: '',
    height_from: '',
    height_to: '',
    weight_from: '',
    weight_to: '',
    classification_from: '',
    classification_to: ''
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
            <h3>Search Ski Jumper</h3>
            <Row>
              <FormGroupInput
                name="first_name"
                type="text"
                placeholder="ski jumper first name"
                label="Firstname:"
              />
              <FormGroupInput
                name="surname"
                type="text"
                placeholder="ski jumper surname"
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
                placeholder="ski jumper team"
                label="Team:"
                options={parsedTeam}
              />
            </Row>
            <Row>
              <FormGroupInput
                name="fis_id"
                type="number"
                placeholder="ski jumper fis id"
                label="FIS ID:"
              />
              <FormGroupInput
                name="active"
                placeholder="ski jumper's activity"
                label="Is ski jumper active:"
                options={{
                  y: 'active',
                  n: 'not active'
                }}
              />
            </Row>

            <Row>
              <FormGroupInput
                range
                type="number"
                name="height"
                label="Height:"
              />
              <FormGroupInput
                range
                type="number"
                name="weight"
                label="Weight:"
              />
            </Row>
            <Row>
              <FormGroupInput
                range
                type="number"
                name="classification"
                label="Classification:"
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

export default SkiJumperSearchForm;
