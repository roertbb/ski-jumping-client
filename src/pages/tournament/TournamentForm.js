import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col, FormGroup, Label, FormFeedback } from 'reactstrap';

const TournamentSchema = Yup.object().shape({
  name: Yup.string()
    .max(30, 'Too Long!')
    .required('Required'),
  edition: Yup.number()
    .min(1, 'Too Short!')
    .max(999, 'Too Long!')
    .required('Required')
});

const invalidInput = (errors, touched) => {
  return `form-control ${errors && touched ? 'is-invalid' : null}`;
};

const TournamentForm = props => {
  return (
    <Formik
      initialValues={{ name: '', edition: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setSubmitting(false);
      }}
      validationSchema={TournamentSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="name">Name:</Label>
                <Field
                  className={invalidInput(errors.name, touched.name)}
                  type="text"
                  name="name"
                />
                <ErrorMessage name="name">
                  {errorMessage => <FormFeedback>{errorMessage}</FormFeedback>}
                </ErrorMessage>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label htmlFor="edition">Edition:</Label>
                <Field
                  className={invalidInput(errors.edition, touched.edition)}
                  type="number"
                  name="edition"
                />
                <ErrorMessage name="edition">
                  {errorMessage => <FormFeedback>{errorMessage}</FormFeedback>}
                </ErrorMessage>
              </FormGroup>
            </Col>
          </Row>

          <Button color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default TournamentForm;
