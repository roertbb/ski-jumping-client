import React from 'react';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';
import FormGroup from '../../components/FormGroup';

const CoachValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(30, 'Too Long!')
    .required(`Required`),
  surname: Yup.string()
    .max(30, 'Too Long!')
    .required(`Required`),
  birth_date: Yup.date().required(`Required`),
  team_id: Yup.number().required(`Required`),
  nationality: Yup.string()
    .max(30, 'Too Long!')
    .required(`Required`)
});

const CoachForm = ({ hideModifyView, add, patch, modifyValue }) => {
  const [teams] = useDate('team');
  const parsedTeam = teams.reduce((prev, team) => {
    prev[team.team_id] = team.team;
    return prev;
  }, {});

  const initialValues =
    modifyValue !== null
      ? modifyValue
      : {
          first_name: '',
          surname: '',
          birth_date: '',
          team_id: '',
          nationality: ''
        };

  // draw spinner while loading teams
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        console.log(values);
        if (modifyValue === null) await add(values);
        else await patch(modifyValue.person_id, values);
        setSubmitting(false);
        hideModifyView();
      }}
      validationSchema={CoachValidationSchema}
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
            <h3>{`${modifyValue === null ? 'Create' : 'Edit'} Coach`}</h3>
            <Row>
              <FormGroupInput
                errorInfo
                name="first_name"
                type="text"
                placeholder="coach first name"
                label="Name:"
              />
              <FormGroupInput
                errorInfo
                name="surname"
                type="text"
                placeholder="coach surname"
                label="Surname:"
              />
            </Row>
            <Row>
              <FormGroupInput
                date
                errorInfo
                name="birth_date"
                type="date"
                placeholder="coach birth date"
                label="Birthdate:"
              />
              <FormGroupInput
                errorInfo
                name="team_id"
                placeholder="coach team"
                label="Team:"
                options={parsedTeam}
              />
            </Row>
            <Row>
              <FormGroupInput
                errorInfo
                name="nationality"
                type="team"
                placeholder="coach nationality"
                label="Nationality:"
              />
              <FormGroup />
            </Row>
            <Row>
              <Button
                onClick={() => {
                  console.log(values, errors, touched);
                }}
                color="success"
                type="submit"
                disabled={isSubmitting}
              >
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

export default CoachForm;
