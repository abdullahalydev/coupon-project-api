// packages
import express from "express";

// securty
import AuthenticationSecurity from "../authentication/authentication.security";

// gates
import BrandGate from "./brand.gate";

// validators
import BrandPayload from "./brand.payload";
import BrandQuery from "./brand.query";
import BrandHeaders from "./brand.header";

// controllers
import BrandController from "./brand.controller";

const route = express.Router();

route.get("/", [
	// validators layer
	BrandPayload.findAll,
	BrandQuery.findAll,
	BrandHeaders.findAll,

	// controller layer
	BrandController.findAll,
]);

route.get("/:brand", [
	// validators layer
	BrandPayload.findAll,
	BrandQuery.findAll,
	BrandHeaders.findAll,

	// gates layer
	BrandGate.parameter,

	// controller layer
	BrandController.findOne,
]);

route.get("/:brand/offers", [
	// validators layer
	BrandPayload.findAllOffers,
	BrandQuery.findAllOffers,
	BrandHeaders.findAllOffers,

	// gates layer
	BrandGate.parameter,

	// controller layer
	BrandController.findAllOffers,
]);

route.post("/", [
	// validators layer
	BrandPayload.createOne,
	BrandQuery.createOne,
	BrandHeaders.createOne,

	// securty
	AuthenticationSecurity.requireAuthentication,
	AuthenticationSecurity.rolesAuthentication(["admin"]),

	// controller layer
	BrandController.createOne,
]);

route.patch("/:brand", [
	// validators layer
	BrandPayload.updateOne,
	BrandQuery.updateOne,
	BrandHeaders.updateOne,

	// securty
	AuthenticationSecurity.requireAuthentication,
	AuthenticationSecurity.rolesAuthentication(["admin"]),

	// gates layer
	BrandGate.parameter,

	// controller layer
	BrandController.updateOne,
]);

route.delete("/:brand", [
	// validators layer
	BrandPayload.deleteOne,
	BrandQuery.deleteOne,
	BrandHeaders.deleteOne,

	// securty
	AuthenticationSecurity.requireAuthentication,
	AuthenticationSecurity.rolesAuthentication(["admin"]),

	// gates layer
	BrandGate.parameter,

	// controller layer
	BrandController.deleteOne,
]);

export default route;
