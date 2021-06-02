// eslint-disable-next-line no-unused-vars
import { FilledInput } from "@material-ui/core";

export default function validateInfo(values) {
  let errors = {};

  if (!values.artTitle) {
    errors.artTitle = 'Art Title required';
  }

  if (!values.genre) {
    errors.genre = 'Please select a Genre';
  } 
  
  return errors;
}
