export default function validateInfo(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = 'Username required';
  }
  
  if (!values.password) {
    errors.password = 'Password is required';
  } 
}
