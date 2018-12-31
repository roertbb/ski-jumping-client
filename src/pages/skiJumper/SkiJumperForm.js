import React from 'react';
import { withRouter } from 'react-router-dom';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';
import OverlaySpinner from '../../components/SpinnerOverlay';

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

const SkiJumperForm = ({ add, patch, modifyValue, history }) => {
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
          fis_id: '',
          active: '',
          height: '',
          weight: ''
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
        if (status) history.push('/ski-jumper');
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
            {!teams && <OverlaySpinner />}
            <h3>{`${modifyValue === null ? 'Create' : 'Edit'} Ski Jumper`}</h3>
            <Row>
              <FormGroupInput
                errorInfo
                name="first_name"
                type="text"
                placeholder="ski jumper name"
                label="Name:"
              />
              <FormGroupInput
                errorInfo
                name="surname"
                type="text"
                placeholder="ski jumper surname"
                label="Surname:"
              />
            </Row>
            <Row>
              <FormGroupInput
                date
                errorInfo
                name="birth_date"
                type="date"
                placeholder="ski jumper birth date"
                label="Birthdate:"
              />
              <FormGroupInput
                errorInfo
                name="team_id"
                placeholder="ski jumper team"
                label="Team:"
                options={parsedTeam}
              />
            </Row>
            <Row>
              <FormGroupInput
                errorInfo
                name="fis_id"
                type="number"
                placeholder="ski jumper fis id"
                label="FIS ID:"
              />
              <FormGroupInput
                errorInfo
                name="active"
                placeholder="ski jumper's activity"
                label="Is ski jumper active:"
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
                placeholder="ski jumper height"
                label="Height:"
              />
              <FormGroupInput
                errorInfo
                name="weight"
                type="number"
                placeholder="ski jumper weight"
                label="Weight:"
              />
            </Row>
            <Row>
              <Button color="success" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              <Button
                onClick={() => history.push('/ski-jumper')}
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

export default withRouter(SkiJumperForm);
