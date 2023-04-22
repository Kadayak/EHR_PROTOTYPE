export type User = {
  cpr: string;
  hashedPassword: string;
};

export type UserToken = {
  cpr: string;
  iat: string;
  exp: string;
};

export type UserTokenGenerator = {
  cpr: string;
};
