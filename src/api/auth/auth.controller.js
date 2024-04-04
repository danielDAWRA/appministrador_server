import * as authService from './auth.service.js';

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    res.json({ msg: 'Completa ambos campos para acceder' });
    return;
  }

  try {
    const response = await authService.login({ email, password });
    res.json(response);
  } catch (error) {
    const myError = JSON.parse(error.message);
    res.status(myError.code);
    res.json({ msg: myError.msg });
  }
}

function isValidEmail(email) {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@.{1,255}$)[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?!-)[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^\+?[0-9]+$/;
  return phoneRegex.test(phoneNumber);
}

async function register(req, res) {
  const {
    email, phone, password, repeatedPassword,
  } = req.body;
  if (!isValidEmail(email)) {
    res.status(400);
    res.json({ msg: 'Please enter a valid email address.' });
    return;
  }
  if (!isValidPhoneNumber(phone)) {
    res.status(400);
    res.json({ msg: 'Please enter a valid telephone number.' });
    return;
  }
  if (password !== repeatedPassword) {
    res.status(400);
    res.json({ msg: 'Both passwords must match.' });
    return;
  }
  const existingUser = await authService.isExistingUser({ email });
  if (existingUser) {
    res.status(400);
    res.json({ msg: 'The email address you have entered is already associated with an account' });
    return;
  }
  const token = await authService.register({ newUser: req.body });
  res.json({ msg: 'We have just sent you a confirmation email—please check your inbox.', token });
}

async function validate(req, res) {
  const { emailToken } = req.params;
  const user = await authService.validate({ emailToken });
  res.json({ msg: `${user.firstName}, your account has been confirmed.` });
}

async function modifySensitiveData(req, res) {
  const { token } = req.params;
  const user = await authService.modifySensitiveData({ token });
  res.json({ msg: `Dear ${user.firstName}, your details have been successfully updated.` });
}

export {
  register,
  validate,
  login,
  isValidEmail,
  modifySensitiveData,
};
