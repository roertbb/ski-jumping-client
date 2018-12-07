import React from 'react';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';

const SkiJumperValidationSchema = Yup.object().shape({
  first_name: Yup.string()
    .max(30, 'Too Long!')
    .required(`Required`),
  surname: Yup.string()
    .max(30, 'Too Long!')
    .required(`Required`),
  birth_date: Yup.date().required(`Required`),
  team_id: Yup.number().required(`Required`),
  fis_id: Yup.number()
    .max(99999, 'Too Long!')
    .required('Required'),
  active: Yup.string().required('Required'),
  height: Yup.number()
    .max(999, 'Too Long!')
    .required('Required'),
  weight: Yup.number()
    .max(99, 'Too Long!')
    .required('Required')
});

const SkiJumperForm = ({ hideModifyView, add, patch, modifyValue }) => {
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
          fis_id: '',
          active: '',
          height: '',
          weight: ''
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
      validationSchema={SkiJumperValidationSchema}
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
            <h3>{`${modifyValue === null ? 'Create' : 'Edit'} Player`}</h3>
            <Row>
              <FormGroupInput
                errorInfo
                name="first_name"
                type="text"
                placeholder="player name"
                label="Name:"
              />
              <FormGroupInput
                errorInfo
                name="surname"
                type="text"
                placeholder="surname country"
                label="Surname:"
              />
            </Row>
            <Row>
              <FormGroupInput
                errorInfo
                name="birth_date"
                type="date"
                placeholder="player birth date"
                label="Birthdate:"
              />
              <FormGroupInput
                errorInfo
                name="team_id"
                placeholder="player team"
                label="Team:"
                options={parsedTeam}
              />
            </Row>
            <Row>
              <FormGroupInput
                errorInfo
                name="fis_id"
                type="number"
                placeholder="players fis id"
                label="FIS ID:"
              />
              <FormGroupInput
                errorInfo
                name="active"
                placeholder="player's activity"
                label="Is player active:"
                options={{
                  y: 'active',
                  n: 'not active'
                }}
              />
            </Row>
            <Row>
              <FormGroupInput
                errorInfo
                name="height"
                type="number"
                placeholder="player height"
                label="Height:"
              />
              <FormGroupInput
                errorInfo
                name="weight"
                type="number"
                placeholder="player weight"
                label="Weight:"
              />
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

export default SkiJumperForm;
