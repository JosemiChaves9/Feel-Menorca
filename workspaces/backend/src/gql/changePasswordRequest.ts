import { sign } from 'jsonwebtoken';
import { DbService } from '../services/DbService';
import { MutationChangePasswordRequestArgs } from '../gql';
import { EmailService } from '../services/EmailService';

export const changePasswordRequest = async (
  parent: null | undefined,
  { email }: MutationChangePasswordRequestArgs
) => {
  const user = await DbService.getUser(email);
  if (!user) {
    return {
      ok: false,
      error: 'El usuario no existe',
    };
  } else {
    const changePasswordToken = sign(
      {},
      process.env.CHANGE_PASSWORD_SECRET as string,
      {
        expiresIn: '1h',
      }
    );
    await DbService.setUserChangePasswordToken(email, changePasswordToken);
    await EmailService.sendChangePasswordRequest(email, changePasswordToken);
    return {
      ok: true,
    };
  }
};
