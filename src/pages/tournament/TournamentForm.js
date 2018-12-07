import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '../../components/Button';
import Row from '../../components/Row';
import FormGroupInput from '../../components/FormGroupInput';
import FormContext from '../../context/FormContext';

const TournamentValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(30, 'Too Long!')
    .required('Required'),
  edition: Yup.number()
    .max(999, 'Too Long!')
    .required('Required')
});

const TournamentForm = ({ hideModifyView, add, patch, modifyValue }) => {
  const initialValues =
    modifyValue !== null ? modifyValue : { name: '', edition: '' };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        if (modifyValue === null) await add(values);
        else await patch(modifyValue.tournament_id, values);
        setSubmitting(false);
        hideModifyView();
      }}
      validationSchema={TournamentValidationSchema}
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
          value={{ handleBlur, handleChange, values, errors, touched }}
        >
          <Form>
            <h3>{`${modifyValue === null ? 'Create' : 'Edit'} Tournament`}</h3>
            <Row>
              <FormGroupInput
                errorInfo
                name="name"
                type="text"
                placeholder="tournament name"
                label="Name:"
              />
              <FormGroupInput
                errorInfo
                name="number"
                type="number"
                placeholder="tournament edition"
                label="Edition:"
              />
            </Row>
            <Row>
              <Button color="success" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <Button
                onClick={() => hideModifyView()}
                color="info"
                type="button"
              >
                Close
              </Button>
            </Row>
          </Form>
        </FormContext.Provider>
      )}
    </Formik>
  );
};

export default TournamentForm;
