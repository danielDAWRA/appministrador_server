import * as usersService from './users.service.js';
import { isValidEmail } from '../auth/auth.controller.js';
import { isExistingUser } from '../auth/auth.service.js';

async function getById(req, res) {
  const { id } = req.params;
  const user = await usersService.getById({ id });
  res.json(user);
}

async function patch(req, res) {
  const { user } = req;
  const newProps = req.body;
  // The following destructuring prevents changes to the fields credit, points and isAdmin
  const {
    credit,
    points,
    isAdmin,
    ...allowedChanges
  } = newProps;
  if (allowedChanges.email) {
    if (!isValidEmail(allowedChanges.email)) {
      res.status(400);
      res.json({ msg: 'Please enter a valid email address.' });
      return;
    }
    const existingUser = await isExistingUser({ email: allowedChanges.email });
    if (existingUser) {
      res.status(400);
      res.json({ msg: 'The email address you have entered is already associated with an account.' });
      return;
    }
    const result = await usersService.patch({ user, newProps: allowedChanges });
    if (!result) {
      res.status(500);
      res.json({ msg: 'We were unable to send an email to the account you provided; please check the details are correct.' });
    }
    res.json({ msg: `We have just sent an email to ${allowedChanges.email}. You must click on the link in the email in order to update your email address.` });
    return;
  }
  if (allowedChanges.password
    && !(allowedChanges.newPassword || allowedChanges.repeatedNewPassword)) {
    res.status(400);
    res.json({ msg: 'Please enter a new password in order to begin the process of changing your password.' });
    return;
  }
  if (allowedChanges.newPassword || allowedChanges.repeatedNewPassword) {
    if (!allowedChanges.password) {
      res.status(400);
      res.json({ msg: 'You must enter your current password to allow password modifications.' });
      return;
    }
    if (allowedChanges.newPassword !== allowedChanges.repeatedNewPassword) {
      res.status(400);
      res.json({ msg: 'Both passwords must match.' });
      return;
    }
    const result = await usersService.patch({ user, newProps: allowedChanges });
    if (!result) {
      res.status(500);
      res.json({ msg: 'We were unable to send an email to the account you provided; please check the details are correct.' });
    }
    if (result.error) {
      const { code, msg } = result.error;
      res.status(code);
      res.json({ msg });
    }
    res.json({ msg: `We have just sent an email to ${user.email}. You must click on the link in the email in order to update your password.` });
    return;
  }
  const updatedUser = await usersService.patch({ user, newProps: allowedChanges });
  res.json(updatedUser);
}

async function getByEmail(req, res) {
  const { email } = req.params;
  const user = await usersService.getByEmail({ email });
  res.json(user);
}

async function getProfile(req, res) {
  return res.json(req.user);
}

export {
  getById,
  patch,
  getByEmail,
  getProfile,
};
