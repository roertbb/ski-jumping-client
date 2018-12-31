import React from 'react';
import { withRouter } from 'react-router-dom';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';
import FormGroup from '../../components/FormGroup';
import OverlaySpinner from '../../components/SpinnerOverlay';

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

const CoachForm = ({ add, patch, modifyValue, history }) => {
  const [teams] = useDate('team');
  const parsedTeam =
    teams &&
    teams.reduce((prev, team) => {
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

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        let status;
        if (modifyValue === null) status = await add(values);
        else status = await patch({ person_id: modifyValue.person_id }, values);
        setSubmitting(false);
        if (status) history.push('/coach');
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
            {!teams && <OverlaySpinner />}
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
              <Button color="success" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <Button
                onClick={() => history.push('/coach')}
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

export default withRouter(CoachForm);
