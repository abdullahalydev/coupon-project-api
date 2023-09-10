// packages
import express from "express";

// securty
import AuthenticationSecurity from "../authentication/authentication.security";

// gates
import OfferGate from "./offer.gate";

// validators
import OfferPayload from "./offer.payload";
import OfferQuery from "./offer.query";
import OfferHeaders from "./offer.header";

// controller
import OfferController from "./offer.controller";

const route = express.Router();

route.get("/", [
	// validators layer
	OfferPayload.findOne,
	OfferQuery.findOne,
	OfferHeaders.findOne,

	// controllers layer
	OfferController.findAll,
]);

route.get("/:offer", [
	// validators layer
	OfferPayload.findOne,
	OfferQuery.findOne,
	OfferHeaders.findOne,

	// gates layer
	OfferGate.parameter,

	// controllers layer
	OfferController.findOne,
]);

route.post("/", [
	// validators layer
	OfferPayload.createOne,
	OfferQuery.createOne,
	OfferHeaders.createOne,

	// securty
	AuthenticationSecurity.requireAuthentication,
	AuthenticationSecurity.rolesAuthentication(["admin"]),

	// controllers layer
	OfferController.createOne,
]);

route.patch("/:offer", [
	// validators layer
	OfferPayload.updateOne,
	OfferQuery.updateOne,
	OfferHeaders.updateOne,

	// securty
	AuthenticationSecurity.requireAuthentication,
	AuthenticationSecurity.rolesAuthentication(["admin"]),

	// gates layer
	OfferGate.parameter,

	// controllers layer
	OfferController.updateOne,
]);

route.delete("/:offer", [
	// validators layer
	OfferPayload.updateOne,
	OfferQuery.updateOne,
	OfferHeaders.updateOne,

	// securty
	AuthenticationSecurity.requireAuthentication,
	AuthenticationSecurity.rolesAuthentication(["admin"]),

	// gates layer
	OfferGate.parameter,

	// controllers layer
	OfferController.updateOne,
]);

export default route;
