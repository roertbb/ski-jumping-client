import React from 'react';
import { Formik, Form } from 'formik';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormGroupInput from '../../components/FormGroupInput';
import FormContext from '../../context/FormContext';
import FormGroup from '../../components/FormGroup';

function SkiJumpingHillSearchForm({ get }) {
  const initialValues = {
    name: '',
    country: '',
    city: '',
    type: '',
    size_from: '',
    size_to: '',
    k_point_from: '',
    k_point_to: '',
    record_from: '',
    record_to: ''
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
            <h3>Search Ski Jumping Hill</h3>
            <Row>
              <FormGroupInput
                name="name"
                type="text"
                placeholder="ski jumping hill name"
                label="Name:"
              />
              <FormGroupInput
                name="country"
                type="text"
                placeholder="ski jumping hill country"
                label="Country:"
              />
            </Row>
            <Row>
              <FormGroupInput
                name="city"
                type="text"
                placeholder="ski jumping hill city"
                label="City:"
              />
              <FormGroupInput
                name="type"
                placeholder="ski jumping hill type"
                label="Type:"
                options={{ n: 'normal', b: 'big', m: 'mammoth' }}
              />
            </Row>
            <Row>
              <FormGroupInput range type="number" name="size" label="Size:" />
              <FormGroupInput
                range
                type="number"
                name="k_point"
                label="K-Point:"
              />
            </Row>
            <Row>
              <FormGroupInput
                range
                type="number"
                name="record"
                label="Record:"
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

export default SkiJumpingHillSearchForm;
