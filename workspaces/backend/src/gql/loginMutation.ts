import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { MutationLoginArgs } from '../gql';
import { DbService } from '../services/DbService';

export const loginMutation = async (
  parent: null | undefined,
  { email, password }: MutationLoginArgs
) => {
  const user = await DbService.getUser(email);

  if (!user) {
    return {
      ok: false,
      error: 'El usuario no existe',
    };
  }
  const isEqual = bcrypt.compareSync(password, user.password);
  if (!isEqual) {
    return {
      ok: false,
      error: 'Contraseña incorrecta',
    };
  }

  const token = sign({ email: user.email }, process.env.SECRET as string, {
    expiresIn: '1h',
  });
  DbService.updateTokenOnUser(user.email, token);
  return { ok: true, email: user.email, token, tokenExpirationHours: 1 };
};
