import React from 'react';
import useDate from '../../hooks/useData';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';
import FormGroup from '../../components/FormGroup';

const IndividualCompetitionValidationSchema = Yup.object().shape({
  competition_date: Yup.date().required(`Required`),
  start_gate: Yup.number()
    .max(99, 'Too Long!')
    .required('Required'),
  tournament_id: Yup.number(),
  hill_id: Yup.number().required('Required'),
  qualification_date: Yup.date().required(`Required`)
});

const IndividualCompetitionForm = ({
  hideModifyView,
  add,
  patch,
  modifyValue
}) => {
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
          hill_id: '',
          qualification_date: ''
        };

  // fallback for null in tournament
  if (initialValues.tournament_id === null) {
    initialValues.tournament_id = '';
  }

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
      validationSchema={IndividualCompetitionValidationSchema}
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
                type="nuumber"
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
              <FormGroupInput
                errorInfo
                date
                name="qualification_date"
                type="date"
                label="Qualification Date:"
              />
              <FormGroup />
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

export default IndividualCompetitionForm;
