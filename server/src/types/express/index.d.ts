import express from "express";
import { UserToken } from "../../routes/auth/user.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserToken;
    }
  }
}

// This code is needed so that req.user = user can be added to the request from the token

// found on https://stackoverflow.com/questions/65848442/property-user-does-not-exist-on-type-requestparamsdictionary-any-any-pars
