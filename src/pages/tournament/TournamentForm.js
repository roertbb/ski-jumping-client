import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/Input';
import FormGroup from '../../components/FormGroup';
import Label from '../../components/Label';
import Button from '../../components/Button';
import Row from '../../components/Row';
import ErrorInfo from '../../components/ErrorInfo';

const TournamentValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(30, 'Too Long!')
    .required('Required'),
  edition: Yup.number()
    .max(999, 'Too Long!')
    .required('Required')
});

const invalidInput = (errors, touched) => {
  return `form-control ${errors && touched ? 'is-invalid' : null}`;
};

const TournamentForm = ({ hideModifyView, add, patch, modifyValue }) => {
  const initialValues =
    modifyValue !== null ? modifyValue : { name: 'example', edition: 1 };

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
        <Form>
          <h3>{`${modifyValue === null ? 'Create' : 'Edit'} tournament`}</h3>
          <Row>
            <FormGroup>
              <Label htmlFor="name">Name:</Label>
              <Input
                className={invalidInput(errors.name, touched.name)}
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                invalid={errors.name}
              />
              {errors.name ? <ErrorInfo>{errors.name}</ErrorInfo> : null}
            </FormGroup>
            <FormGroup>
              <Label htmlFor="edition">Edition:</Label>
              <Input
                className={invalidInput(errors.edition, touched.edition)}
                type="number"
                name="edition"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.edition}
                invalid={errors.edition}
              />
              {errors.edition ? <ErrorInfo>{errors.edition}</ErrorInfo> : null}
            </FormGroup>
          </Row>
          <Row>
            <Button color="success" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            <Button onClick={() => hideModifyView()} color="info" type="button">
              Close
            </Button>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default TournamentForm;
