import React from 'react';
import * as Yup from 'yup';
import Container from '../../components/Container';
import Button from '../../components/Button';
import { Formik, Form } from 'formik';
import Row from '../../components/Row';
import FormGroupInput from '../../components/FormGroupInput';
import useData from '../../hooks/useData';
import FormContext from '../../context/FormContext';

function AddPlacement({ competitionId, addPlacement, placements, setView }) {
  const [skiJumpers] = useData('ski-jumper');
  const parseSkiJumpers = () => {
    return skiJumpers.reduce((prev, skiJumper) => {
      if (
        !placements.filter(
          placement => placement.person_id === skiJumper.person_id
        ).length
      )
        prev[skiJumper.person_id] = `${skiJumper.first_name} ${
          skiJumper.surname
        }`;

      return prev;
    }, {});
  };
  const parsedSkiJumpers = parseSkiJumpers();

  const SkiJumpersValidationSchema = Yup.object().shape({
    person_id: Yup.number().required(`Required`)
  });

  return (
    <>
      <Container blank>
        <h1>Placement</h1>
        <Button color="info" onClick={() => setView('placement')}>
          back to Placement
        </Button>
      </Container>
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
            setView('placement');
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

export default AddPlacement;
