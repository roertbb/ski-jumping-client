import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import Container from '../../components/Container';
import Button from '../../components/Button';
import { Formik, Form } from 'formik';
import Row from '../../components/Row';
import FormGroupInput from '../../components/FormGroupInput';
import useData from '../../hooks/useData';
import FormContext from '../../context/FormContext';

function AddPlacement({ competitionId, addPlacement, placements, history }) {
  const [skiJumpers] = useData('ski-jumper');
  const parseSkiJumpers = () => {
    return (
      skiJumpers &&
      placements &&
      skiJumpers.reduce((prev, skiJumper) => {
        if (
          !placements.filter(
            placement => placement.person_id === skiJumper.person_id
          ).length
        )
          prev[skiJumper.person_id] = `${skiJumper.first_name} ${
            skiJumper.surname
          }`;

        return prev;
      }, {})
    );
  };
  const parsedSkiJumpers = parseSkiJumpers();

  const SkiJumpersValidationSchema = Yup.object().shape({
    person_id: Yup.number().required(`Required`)
  });

  return (
    <>
      {!competitionId && <Redirect to="/placement" />}
      <Container>
        <Formik
          initialValues={{ person_id: '' }}
          enableReinitialize={true}
          onSubmit={async values => {
            const { person_id } = values;
            await addPlacement({
              person_id,
              competition_id: competitionId
            });
            history.push('/placement');
          }}
          validationSchema={SkiJumpersValidationSchema}
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
              value={{
                handleBlur,
                handleChange,
                values,
                errors,
                touched
              }}
            >
              <Form>
                <Row>
                  <FormGroupInput
                    errorInfo
                    name="person_id"
                    placeholder="ski_jumper"
                    label="Choose Ski Jumper:"
                    options={parsedSkiJumpers}
                  />
                </Row>
                <Row>
                  <Button color="info" type="submit">
                    Add Ski Jumper
                  </Button>
                </Row>
              </Form>
            </FormContext.Provider>
          )}
        </Formik>
      </Container>
    </>
  );
}

export default withRouter(AddPlacement);
