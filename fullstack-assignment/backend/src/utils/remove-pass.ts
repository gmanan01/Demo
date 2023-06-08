import { User } from "../models/user";

export const RemovePass = (user: User) => {
  const userWithoutPassword = {
    id: user.id,
    email: user.email,
    balance: user.balance,
  };
  return userWithoutPassword;
};
