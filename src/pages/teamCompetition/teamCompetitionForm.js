import React from 'react';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';

const TeamCompetitionValidationSchema = Yup.object().shape({
  competition_date: Yup.date().required(`Required`),
  start_gate: Yup.number()
    .max(99, 'Too Long!')
    .required('Required'),
  tournament_id: Yup.number().required('Required'),
  hill_id: Yup.number().required('Required')
});

const TeamCompetitionForm = ({ hideModifyView, add, patch, modifyValue }) => {
  const [tournaments] = useDate('tournament');
  const parsedTournament = tournaments.reduce((prev, tournament) => {
    prev[tournament.tournament_id] = tournament.name;
    return prev;
  }, {});

  const [skiJumpingHills] = useDate('ski-jumping-hill');
  const parsedHills = skiJumpingHills.reduce((prev, hill) => {
    prev[hill.ski_jumping_hill_id] = hill.name;
    return prev;
  }, {});

  const initialValues =
    modifyValue !== null
      ? modifyValue
      : {
          competition_date: '',
          start_gate: '',
          tournament_id: '',
          hill_id: ''
        };

  // draw spinner while loading teams
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        if (modifyValue === null) await add(values);
        else await patch(modifyValue.competition_id, values);
        setSubmitting(false);
        hideModifyView();
      }}
      validationSchema={TeamCompetitionValidationSchema}
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
            } Individual Competitions`}</h3>
            <Row>
              <FormGroupInput
                errorInfo
                date
                name="competition_date"
                type="date"
                label="Date:"
              />
              <FormGroupInput
                errorInfo
                name="start_gate"
                type="text"
                placeholder="competition start gate"
                label="Start Gate:"
              />
            </Row>
            <Row>
              <FormGroupInput
                name="tournament_id"
                placeholder="competition tournament"
                label="Tournament:"
                options={parsedTournament}
              />
              <FormGroupInput
                name="hill_id"
                placeholder="ski jumping hill"
                label="Ski Jumping Hill:"
                options={parsedHills}
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

export default TeamCompetitionForm;
