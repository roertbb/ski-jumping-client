import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Row, Col, Label, Button } from 'reactstrap';

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
        const parameters = {};
        for (const value in values) {
          if (values[value] !== '') parameters[value] = values[value];
        }
        await get(parameters);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, resetForm }) => (
        <Form>
          <Row form>
            <Col md={6}>
              <Label htmlFor="name">Name:</Label>
              <Field
                className="form-control mb-2"
                placeholder="tournament's name"
                type="text"
                name="name"
              />
            </Col>
            <Col md={6}>
              <Label htmlFor="edition_from">Edition:</Label>
              <Row form>
                <Col md={6} className="mb-2">
                  <Field
                    className="form-control"
                    placeholder="from"
                    type="number"
                    name="edition_from"
                  />
                </Col>
                <Col md={6} className="mb-3">
                  <Field
                    className="form-control"
                    placeholder="to"
                    type="number"
                    name="edition_to"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <Button
                className="mr-2"
                color="primary"
                type="submit"
                disabled={isSubmitting}
              >
                Search
              </Button>
              <Button
                color="primary"
                type="button"
                disabled={isSubmitting}
                onClick={() => {
                  clearFilters(resetForm);
                }}
              >
                Clear filters
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
}

export default TournamentSearchForm;
