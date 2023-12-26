enum ErrorMessages {
  fileAbsentErr = 'File is absent',
  emailRegExErr = 'Email must be letters, digits, dot and @',
  phoneRegExErr = 'Phone number must be digits and can start with character +',
  dateOfBirthRegExErr = 'Date of birth must be in DD-MM-YYYY format',
  phoneRequiredErr = 'Missing required phone field',
  nameRequiredErr = 'Missing required name field',
  emailRequiredErr = 'Missing required email field',
  passwordRequiredErr = 'Missing required password field',
  passwordLengthErr = 'Password length must be at least 6 characters long',
}

export default ErrorMessages;
