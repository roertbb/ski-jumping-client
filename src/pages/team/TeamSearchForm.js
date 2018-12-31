import React from 'react';
import { Formik, Form } from 'formik';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormGroupInput from '../../components/FormGroupInput';
import FormContext from '../../context/FormContext';
import FormGroup from '../../components/FormGroup';

function TeamSearchForm({ get }) {
  const initialValues = {
    team: '',
    classification_from: '',
    classification_to: '',
    classification_points_from: '',
    classification_points_to: ''
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
            <h3>Search Team</h3>
            <Row>
              <FormGroupInput
                name="team"
                type="text"
                placeholder="team name"
                label="Team Name:"
              />
              <FormGroupInput
                range
                name="classification"
                type="text"
                placeholder="team classification"
                label="Classification:"
              />
            </Row>
            <Row>
              <FormGroupInput
                range
                name="classification_points"
                type="text"
                placeholder="team classification points"
                label="Classification Points:"
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

export default TeamSearchForm;
