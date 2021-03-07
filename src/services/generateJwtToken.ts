import jwt from 'jsonwebtoken';

import config from '../config';

export default (user: any) => {
  const token = jwt.sign(user, config.SessionSecret, {
    expiresIn: '7d',
  });
  return token;
};
