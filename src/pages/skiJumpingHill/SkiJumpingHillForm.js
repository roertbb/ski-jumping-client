import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';

const SkiJumpingHillValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(30, 'Too Long!')
    .required(`Required`),
  country: Yup.string()
    .max(30, 'Too Long!')
    .required(`Required`),
  city: Yup.string()
    .max(30, 'Too Long!')
    .required(`Required`),
  type: Yup.string().required('Required'),
  size: Yup.number()
    .max(999, 'Too Long!')
    .required('Required'),
  k_point: Yup.number()
    .max(999, 'Too Long!')
    .required('Required')
});

const SkiJumpingHillForm = ({ hideModifyView, add, patch, modifyValue }) => {
  const initialValues =
    modifyValue !== null
      ? modifyValue
      : { name: '', country: '', city: '', type: '', size: '', k_point: '' };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        if (modifyValue === null) await add(values);
        else await patch(modifyValue.ski_jumping_hill_id, values);
        setSubmitting(false);
        hideModifyView();
      }}
      validationSchema={SkiJumpingHillValidationSchema}
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
            <h3>{`${
              modifyValue === null ? 'Create' : 'Edit'
            } Ski Jumping Hill`}</h3>
            <Row>
              <FormGroupInput
                errorInfo
                name="name"
                type="text"
                placeholder="ski jumping hill name"
                label="Name:"
              />
              <FormGroupInput
                errorInfo
                name="country"
                type="text"
                placeholder="ski jumping hill country"
                label="Country:"
              />
            </Row>
            <Row>
              <FormGroupInput
                errorInfo
                name="city"
                type="text"
                placeholder="ski jumping hill city"
                label="City:"
              />
              <FormGroupInput
                errorInfo
                name="type"
                placeholder="ski jumping hill type"
                label="Type:"
                options={{ n: 'normal', b: 'big', m: 'mammoth' }}
              />
            </Row>
            <Row>
              <FormGroupInput
                errorInfo
                name="size"
                type="number"
                placeholder="ski jumping hill size"
                label="Size:"
              />
              <FormGroupInput
                errorInfo
                name="k_point"
                type="number"
                placeholder="ski jumping hill K-point"
                label="K-Point:"
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

export default SkiJumpingHillForm;
