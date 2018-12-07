const invalidInput = (errors, touched) => {
  return `form-control ${errors && touched ? 'is-invalid' : null}`;
};

export default invalidInput;
