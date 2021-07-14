import { verify } from "jsonwebtoken";

export const tokenValidation = async (token: string) => {
  try {
    verify(token, process.env.SECRET as string);
    return true;
  } catch (err) {
    return false;
  }
};
