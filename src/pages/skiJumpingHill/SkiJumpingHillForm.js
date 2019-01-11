import React from 'react';
import { withRouter } from 'react-router-dom';
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
    .min(1, 'Too Small!')
    .max(300, 'Too Long!')
    .required('Required'),
  k_point: Yup.number()
    .min(1, 'Too Small!')
    .max(300, 'Too Long!')
    .required('Required')
});

const SkiJumpingHillForm = ({ add, patch, modifyValue, history }) => {
  const initialValues =
    modifyValue !== null
      ? modifyValue
      : { name: '', country: '', city: '', type: '', size: '', k_point: '' };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        let status;
        if (modifyValue === null) status = await add(values);
        else
          status = await patch(
            { ski_jumping_hill_id: modifyValue.ski_jumping_hill_id },
            values
          );
        setSubmitting(false);
        if (status) history.push('/ski-jumping-hill');
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
                options={{ n: 'normal', l: 'large', m: 'mammoth' }}
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
                onClick={() => history.push('/ski-jumping-hill')}
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

export default withRouter(SkiJumpingHillForm);
