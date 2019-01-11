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

const IndividualCompetitionValidationSchema = Yup.object().shape({
  competition_date: Yup.date().required(`Required`),
  start_gate: Yup.number()
    .min(1, 'Too Small!')
    .max(20, 'Too Long!')
    .required('Required'),
  tournament_id: Yup.number(),
  ski_jumping_hill_id: Yup.number().required('Required'),
  qualification_date: Yup.date()
    .required(`Required`)
    .max(
      Yup.ref('competition_date') ? Yup.ref('competition_date') : null,
      'Qualification should take place before competition'
    )
});

const IndividualCompetitionForm = ({ add, patch, modifyValue, history }) => {
  const [tournaments] = useDate('tournament');
  const parsedTournament =
    tournaments &&
    tournaments.reduce((prev, tournament) => {
      prev[tournament.tournament_id] = tournament.name;
      return prev;
    }, {});

  const [skiJumpingHills] = useDate('ski-jumping-hill');
  const parsedHills =
    skiJumpingHills &&
    skiJumpingHills.reduce((prev, hill) => {
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
          ski_jumping_hill_id: '',
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
        let status;
        if (modifyValue === null) status = await add(values);
        else
          status = await patch(
            { competition_id: modifyValue.competition_id },
            values
          );
        setSubmitting(false);
        if (status) history.push('/individual-competition');
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
            {!tournaments && !skiJumpingHills && <OverlaySpinner />}
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
                name="ski_jumping_hill_id"
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
                onClick={() => history.push('/individual-competition')}
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

export default withRouter(IndividualCompetitionForm);
