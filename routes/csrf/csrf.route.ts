// packages
import express from "express";

// paylaod
import CSRFPayload from "./csrf.payload";
import CSRFQuery from "./csrf.query";
import CSRFHeaders from "./csrf.header";

// controllers
import CSRFController from "./csrf.controller";

const route = express.Router();

route.get("/", [
	// validators layer
	CSRFPayload.get,
	CSRFQuery.get,
	CSRFHeaders.get,

	// controller layer
	CSRFController.get,
]);

export default route;
