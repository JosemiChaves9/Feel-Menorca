import { verify } from 'jsonwebtoken';

export const changePasswordTokenValidation = async (
  changePasswordToken: string
) => {
  try {
    verify(changePasswordToken, process.env.CHANGE_PASSWORD_SECRET as string);
    return true;
  } catch (err) {
    return false;
  }
};
