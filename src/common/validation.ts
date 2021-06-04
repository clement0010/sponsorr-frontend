/* To have in production:
  password strength
*/
export const requireInputRule = (value: string): boolean | string => !!value || 'Required';

export const numericsOnlyRule = (phoneNumber: string): boolean | string =>
  /^[0-9]+$/.test(phoneNumber) || 'Phone number must be valid';

export const validEmailRule = (email: string): boolean | string =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'Email must be valid';

export const passwordLengthRule = (password: string): boolean | string =>
  (password && password.length >= 8) || 'Password must have at least 8 characters';

export const validURLRule = (url: string): boolean | string =>
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\\+\\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\\+\\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\\+~%\\/.\w-_]*)?\??(?:[-\\+=&;%@.\w_]*)#?(?:[\w]*))?)/.test(
    url,
  ) || 'URL must be valid';
// export const validatePassword = (password: string, repeatedPassword: string): boolean | string =>
//   // eslint-disable-next-line
//   password === repeatedPassword || 'Password do not match';
/*
const passwordStrengthRule = (password: string) =>
/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(password)
|| 'Password must contain at least lowercase letter, one number,
a special character and one uppercase letter';
*/
