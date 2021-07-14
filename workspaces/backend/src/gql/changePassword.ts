import { DbService } from '../services/DbService';
import { MutationChangePasswordArgs } from '../gql';
import { changePasswordTokenValidation } from '../utils/changePasswordTokenValidation';
import bcrypt from 'bcryptjs';

export const changePassword = async (
  parent: null | undefined,
  { newPassword, changePasswordToken }: MutationChangePasswordArgs
) => {
  const validateToken = await changePasswordTokenValidation(
    changePasswordToken
  );
  const checkIfUserHasChangePasswordToken =
    await DbService.getUserFromChangePasswordToken(changePasswordToken);
  if (validateToken && checkIfUserHasChangePasswordToken) {
    const newEncryptedPassword = bcrypt.hashSync(newPassword, 10);
    await DbService.changeUserPassword(
      newEncryptedPassword,
      changePasswordToken
    );
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: 'El token no es valido',
    };
  }
};
