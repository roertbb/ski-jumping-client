import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';

const TeamValidationSchema = Yup.object().shape({
  team: Yup.string()
    .max(30, 'Too Long!')
    .required(`Required`)
});

const TeamForm = ({ hideModifyView, add, patch, modifyValue }) => {
  const initialValues = modifyValue !== null ? modifyValue : { team: '' };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        if (modifyValue === null) await add(values);
        else await patch(modifyValue.team_id, values);
        setSubmitting(false);
        hideModifyView();
      }}
      validationSchema={TeamValidationSchema}
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
            <h3>{`${modifyValue === null ? 'Create' : 'Edit'} Team`}</h3>
            <Row>
              <FormGroupInput
                errorInfo
                name="team"
                type="text"
                placeholder="team name"
                label="Name:"
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

export default TeamForm;
