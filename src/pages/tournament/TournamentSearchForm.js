import React from 'react';
import { Formik, Form } from 'formik';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Label from '../../components/Label';
import Row from '../../components/Row';
import Button from '../../components/Button';

function TournamentSearchForm({ get }) {
  const initialValues = { name: '', edition_from: '', edition_to: '' };

  const clearFilters = async resetForm => {
    resetForm();
    await get();
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        const parameters = {};
        for (const value in values) {
          if (values[value] !== '') parameters[value] = values[value];
        }
        await get(parameters);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm, handleBlur, handleChange, values }) => (
        <Form>
          <h3>Search tournaments</h3>
          <Row>
            <FormGroup>
              <Label htmlFor="name">Name:</Label>
              <Input
                id="name"
                type="text"
                placeholder="tournament name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
            </FormGroup>
            <FormGroup>
              <Label>Edition:</Label>
              <Input
                id="edition_from"
                type="number"
                placeholder="from"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.edition_from}
              />
              <Input
                id="edition_to"
                type="number"
                placeholder="to"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.edition_to}
              />
            </FormGroup>
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
      )}
    </Formik>
  );
}

export default TournamentSearchForm;
