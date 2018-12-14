import React, { useContext } from 'react';
import Label from './Label';
import FormGroup from './FormGroup';
import FormContext from '../context/FormContext';
import Input from './Input';
import ErrorInfo from './ErrorInfo';
import Select from './Select';

function FormGroupInput(props) {
  const { handleBlur, handleChange, values, errors, touched } = useContext(
    FormContext
  );

  let input = (
    <Input
      type={props.type}
      id={props.name}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[props.name]}
      invalid={!!props.errorInfo && errors[props.name] && touched[props.name]}
      placeholder={props.placeholder}
    />
  );
  if (props.options) {
    const options = Object.entries(props.options).map(entry => (
      <option key={entry[0]} value={entry[0]}>
        {entry[1]}
      </option>
    ));
    input = (
      <Select
        id={props.name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={values[props.name]}
        invalid={!!props.errorInfo && errors[props.name] && touched[props.name]}
      >
        <option value="" hidden>
          {props.placeholder}
        </option>
        {options}
      </Select>
    );
  } else if (props.range) {
    input = (
      <>
        <Input
          id={`${props.name}_from`}
          type={props.type}
          placeholder="from"
          onChange={handleChange}
          onBlur={handleBlur}
          value={
            !props.date
              ? values[`${props.name}_from`]
              : values[`${props.name}_from`] &&
                values[`${props.name}_from`].split('T')[0]
          }
        />
        <Input
          id={`${props.name}_to`}
          type={props.type}
          placeholder="to"
          onChange={handleChange}
          onBlur={handleBlur}
          value={
            !props.date
              ? values[`${props.name}_to`]
              : values[`${props.name}_to`] &&
                values[`${props.name}_to`].split('T')[0]
          }
        />
      </>
    );
  }

  return (
    <FormGroup>
      <Label htmlFor={props.name}>{props.label}</Label>
      {input}
      {props.errorInfo && errors[props.name] && touched[props.name] ? (
        <ErrorInfo>{errors[props.name]}</ErrorInfo>
      ) : null}
    </FormGroup>
  );
}

export default FormGroupInput;
