import React from 'react';
import { withRouter } from 'react-router-dom';
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

const TournamentForm = ({ add, patch, modifyValue, history }) => {
  const initialValues =
    modifyValue !== null ? modifyValue : { name: '', edition: '' };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        let status;
        if (modifyValue === null) status = await add(values);
        else
          status = await patch(
            { tournament_id: modifyValue.tournament_id },
            values
          );
        setSubmitting(false);
        if (status) history.push('/tournament');
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
                name="edition"
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
                onClick={() => history.push('/tournament')}
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

export default withRouter(TournamentForm);
