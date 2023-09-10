import express from "express";

// security
import AuthenticationSecurity from "../authentication/authentication.security";

// validators
import UserHeaders from "./user.header";
import UserPayload from "./user.payload";
import UserQuery from "./user.query";

// controller
import UserController from "./user.controller";

const route = express.Router();

route.get("/", [
    // validators layer
    UserPayload.findOne,
    UserQuery.findOne,
    UserHeaders.findOne,

    // security layer
    AuthenticationSecurity.requireAuthentication,

    // controllers layer
    UserController.findOne
])

export default route;
