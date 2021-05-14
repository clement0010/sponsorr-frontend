/* To have in production:
  password strength
*/
export const requireInputRule = (value: string): boolean | string => !!value || 'Required';

export const validEmailRule = (email: string): boolean | string =>
  // eslint-disable-next-line
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'Email must be valid';

export const passwordLengthRule = (password: string): boolean | string =>
  // eslint-disable-next-line
  (password && password.length >= 8) || 'Password must have at least 8 characters';

// export const validatePassword = (password: string, repeatedPassword: string): boolean | string =>
//   // eslint-disable-next-line
//   password === repeatedPassword || 'Password do not match';
/*
const passwordStrengthRule = (password: string) =>
/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)
|| 'Password must contain at least lowercase letter, one number,
a special character and one uppercase letter';
*/
