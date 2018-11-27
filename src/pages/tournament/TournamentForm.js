import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Row,
  Col,
  FormGroup,
  Label,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

const TournamentValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(30, 'Too Long!')
    .required('Required'),
  edition: Yup.number()
    .max(999, 'Too Long!')
    .required('Required')
});

const invalidInput = (errors, touched) => {
  return `form-control ${errors && touched ? 'is-invalid' : null}`;
};

const TournamentForm = ({
  isModalOpen,
  closeModal,
  add,
  patch,
  modalValue
}) => {
  const initialValues =
    modalValue !== null ? modalValue : { name: 'example', edition: 1 };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={async (values, { setSubmitting }) => {
        if (modalValue === null) await add(values);
        else await patch(modalValue.tournament_id, values);
        setSubmitting(false);
        closeModal();
      }}
      validationSchema={TournamentValidationSchema}
    >
      {({ isSubmitting, errors, touched }) => (
        <Modal isOpen={isModalOpen} toggle={closeModal}>
          <Form>
            <ModalHeader>
              <h3>{`${modalValue === null ? 'Create' : 'Edit'} tournament`}</h3>
            </ModalHeader>
            <ModalBody>
              <Row form>
                <Col md={12}>
                  <FormGroup>
                    <Label htmlFor="name">Name:</Label>
                    <Field
                      className={invalidInput(errors.name, touched.name)}
                      type="text"
                      name="name"
                    />
                    <ErrorMessage name="name">
                      {errorMessage => (
                        <FormFeedback>{errorMessage}</FormFeedback>
                      )}
                    </ErrorMessage>
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label htmlFor="edition">Edition:</Label>
                    <Field
                      className={invalidInput(errors.edition, touched.edition)}
                      type="number"
                      name="edition"
                    />
                    <ErrorMessage name="edition">
                      {errorMessage => (
                        <FormFeedback>{errorMessage}</FormFeedback>
                      )}
                    </ErrorMessage>
                  </FormGroup>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={() => closeModal()}
                color="secondary"
                type="button"
              >
                Close
              </Button>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default TournamentForm;
