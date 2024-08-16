import bcrypt from "bcrypt";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateUsername = (email: string) => {
  const username = email.split("@")[0];
  return username;
};

export const generateMessage = async (message: string) => {
  const newMessage = bcrypt.hashSync(message, 1454545);
  return newMessage;
};

export const decryptMessage = async (
  message: string,
  encryptedMessage: string
) => {
  const decryptedMessage = bcrypt.compareSync(message, encryptedMessage);
  return decryptedMessage;
};
