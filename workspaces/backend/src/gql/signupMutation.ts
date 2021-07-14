import { sign } from 'jsonwebtoken';
import { DbService } from '../services/DbService';
import bcrypt from 'bcryptjs';
import * as EmailValidator from 'email-validator';
import { MutationSignupArgs } from '../gql';

export const signupMutation = async (
  parent: null | undefined,
  { email, phoneNumber, password }: MutationSignupArgs
) => {
  const users = await DbService.getUser(email);
  if (users) {
    return {
      ok: false,
      error: 'El email no es válido',
    };
  }
  if (EmailValidator.validate(email)) {
    const encryptedPass = bcrypt.hashSync(password, 10);
    const token = sign({ email }, process.env.SECRET as string, {
      expiresIn: '1h',
    });
    await DbService.createUser(email, phoneNumber, encryptedPass, token);
    return {
      token: token,
      ok: true,
      tokenExpirationHours: 1,
    };
  } else {
    return {
      ok: false,
      error: 'El email no es válido',
    };
  }
};
