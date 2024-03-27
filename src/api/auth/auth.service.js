import { compareSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as usersRepository from '../users/users.repository.js';
import transporter from '../nodemailer.js';

function getToken({ userId, timeout }) {
  const payload = {
    userId,
  };

  const { TOKEN_SECRET_WORD } = process.env;
  const options = {
    expiresIn: timeout,
  };

  const token = jwt.sign(payload, TOKEN_SECRET_WORD, options);
  return token;
}

async function login({ email, password }) {
  const user = await usersRepository.getByEmail({ email });

  if (!user || !compareSync(password, user.password)) {
    const myError = {
      code: 401,
      msg: 'Wrong login information',
    };

    throw new Error(JSON.stringify(myError));
  }

  const { TOKEN_TIMEOUT } = process.env;
  const token = getToken({ userId: user._id, timeout: TOKEN_TIMEOUT });

  const formattedUser = { ...user };
  delete formattedUser.password;
  delete formattedUser.credit;

  return { token, user: JSON.stringify(formattedUser) };
}

async function isExistingUser({ email }) {
  const existingUser = await usersRepository.getByEmail({ email });
  return existingUser;
}

async function sendEmail({ email }) {
  const { EMAIL_TIMEOUT, SERVER_URL } = process.env;
  const emailToken = getToken({ userId: email, timeout: EMAIL_TIMEOUT });
  const url = `${SERVER_URL}auth/validate/${emailToken}`;
  await transporter.sendMail({
    to: email,
    subject: 'Confirm registration',
    html: `<h3>You're almost there!</h3><br><a href=${url}>Click this link to confirm your email address.</a>`,
  });
}

async function register({ newUser }) {
  const { password } = newUser;
  const intSaltOrRoundsHash = parseInt(process.env.SALT_OR_ROUNDS_HASH);
  const hashedPassword = hashSync(password, intSaltOrRoundsHash);
  const user = newUser;
  user.password = hashedPassword;
  const createdUser = await usersRepository.register({ user });
  await sendEmail({ email: user.email });
  const { TOKEN_TIMEOUT } = process.env;
  const token = getToken({ userId: createdUser._id, timeout: TOKEN_TIMEOUT });
  return token;
}

async function validate({ emailToken }) {
  const { TOKEN_SECRET_WORD } = process.env;
  const payload = jwt.verify(emailToken, TOKEN_SECRET_WORD);
  const user = await usersRepository.validate({ email: payload.userId });
  return user;
}

async function modifySensitiveData({ token }) {
  const { TOKEN_SECRET_WORD } = process.env;
  const payload = jwt.verify(token, TOKEN_SECRET_WORD);
  const { _id, dataType, sensitiveData } = payload.userId;
  if (dataType === 'password') {
    const intSaltOrRoundsHash = parseInt(process.env.SALT_OR_ROUNDS_HASH);
    const hashedPassword = hashSync(sensitiveData, intSaltOrRoundsHash);
    const user = await usersRepository.modifySensitiveData({
      _id,
      dataType,
      sensitiveData: hashedPassword,
    });
    return user;
  }
  const user = await usersRepository.modifySensitiveData({ _id, dataType, sensitiveData });
  return user;
}

export {
  getToken,
  register,
  validate,
  login,
  isExistingUser,
  modifySensitiveData,
};
