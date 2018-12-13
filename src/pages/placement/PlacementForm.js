import React from 'react';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';

const PlacementValidationSchema = Yup.object().shape({
  ski_jumper_id: Yup.number().required(`Required`),
  competition_id: Yup.number().required(`Required`)
});

const PlacementForm = ({ hideModifyView, add, patch, modifyValue }) => {
  const [skiJumpers] = useDate('ski-jumper');
  const parsedSkiJumper = skiJumpers.reduce((prev, skiJumper) => {
    prev[skiJumper.person_id] = `${skiJumper.first_name} ${skiJumper.surname}`;
    return prev;
  }, {});

  const [individualCompetition] = useDate('individual-competition');
  const parsedIndividualCompetition = individualCompetition.reduce(
    (prev, competition) => {
      prev[competition.competition_id] = `#${competition.competition_id}`;
      return prev;
    },
    {}
  );

  const initialValues =
    modifyValue !== null
      ? modifyValue
      : {
          ski_jumper_id: '',
          competition_id: ''
        };

  // draw spinner while loading teams
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        if (modifyValue === null) await add(values);
        else
          await patch(
            {
              ski_jumper_id: modifyValue.ski_jumper_id,
              competition_id: modifyValue.competition_id
            },
            values
          );
        setSubmitting(false);
        hideModifyView();
      }}
      validationSchema={PlacementValidationSchema}
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

export default PlacementForm;
