import React, { useEffect, useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Row from '../../components/Row';
import Button from '../../components/Button';
import FormContext from '../../context/FormContext';
import FormGroupInput from '../../components/FormGroupInput';
import FormGroup from '../../components/FormGroup';
import Container from '../../components/Container';
import axios from '../../axios';
import OverlaySpinner from '../../components/SpinnerOverlay';

const SeriesResultValidationSchema = Yup.object().shape({
  state: Yup.string().required(`Required`),
  distance: Yup.number().max(999, 'Too long!'),
  gate: Yup.number().max(99, 'Too long!'),
  style_points: Yup.number().max(999, 'Too long!'),
  distance_points: Yup.number().max(999, 'Too long!'),
  gate_points: Yup.number().max(999, 'Too long!'),
  wind_points: Yup.number().max(999, 'Too long!')
});

const SeriesResultForm = ({
  modifyValue,
  competitionId,
  personId,
  seriesId,
  history
}) => {
  const initialValues = {
    state: '',
    distance: '',
    gate: '',
    style_points: '',
    distance_points: '',
    gate_points: '',
    wind_points: ''
  };

  let [series, setSeries] = useState(null);
  const getSeriesData = async () => {
    const resp = await axios.get(
      `/series-result?person_id=${personId}&competition_id=${competitionId}&series_id=${seriesId}`
    );
    if (!!resp.data.results) {
      setSeries(resp.data.results);
    }
  };
  useEffect(() => {
    getSeriesData();
  }, []);

  return (
    <>
      {(!seriesId || !personId || !competitionId) && (
        <Redirect to="/placement" />
      )}
      <Container>
        {!series && <OverlaySpinner />}
        <Formik
          initialValues={series === null ? initialValues : series}
          enableReinitialize={true}
          onSubmit={async (values, { setSubmitting }) => {
            if (series === null) {
              const result = {
                ...values,
                competition_id: competitionId,
                person_id: personId,
                series_id: seriesId
              };
              const resp = await axios.post('/series-result', result);
            } else {
              const result = {
                ...series,
                ...values
              };
              const resp = await axios.patch(
                `/series-result?person_id=${personId}&competition_id=${competitionId}&series_id=${seriesId}`,
                result
              );
            }
            setSubmitting(false);
            history.push(`/placement/${competitionId}/${seriesId}`);
          }}
          validationSchema={SeriesResultValidationSchema}
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
                } Series Result`}</h3>
                <Row>
                  <FormGroupInput
                    errorInfo
                    name="state"
                    placeholder="result type"
                    label="State:"
                    options={{ DNS: 'DNS', DNQ: 'DNQ', DSQ: 'DSQ', Q: 'Q' }}
                  />
                  <FormGroupInput
                    errorInfo
                    name="distance"
                    type="number"
                    placeholder="series distance"
                    label="Distance:"
                  />
                </Row>
                <Row>
                  <FormGroupInput
                    errorInfo
                    name="gate"
                    type="number"
                    placeholder="series gate"
                    label="Gate:"
                  />
                  <FormGroupInput
                    errorInfo
                    name="style_points"
                    type="number"
                    placeholder="series style points"
                    label="Style Points:"
                  />
                </Row>
                <Row>
                  <FormGroupInput
                    errorInfo
                    name="distance_points"
                    type="number"
                    placeholder="series distance points"
                    label="Distance Points:"
                  />
                  <FormGroupInput
                    errorInfo
                    name="gate_points"
                    type="number"
                    placeholder="series gate points"
                    label="Gate Points:"
                  />
                </Row>
                <Row>
                  <FormGroupInput
                    errorInfo
                    name="wind_points"
                    type="number"
                    placeholder="series wind points"
                    label="Wind Points:"
                  />
                  <FormGroup />
                </Row>
                <Row>
                  <Button color="success" type="submit" disabled={isSubmitting}>
                    Submit
                  </Button>
                  <Button
                    onClick={() =>
                      history.push(`/placement/${competitionId}/${personId}`)
                    }
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
      </Container>
    </>
  );
};

export default withRouter(SeriesResultForm);
