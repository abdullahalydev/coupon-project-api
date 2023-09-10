// packages
import express from "express";

// securty
import AuthenticationSecurity from "../authentication/authentication.security";

// validators
import RegionHeaders from "./region.header";
import RegionPayload from "./region.payload";
import RegionQuery from "./region.query";

// gates
import RegionGate from "./region.gate";

// controllers
import RegionController from "./region.controller";

const route = express.Router();

route.get("/", [
	// validators layers
	RegionHeaders.findAll,
	RegionQuery.findAll,
	RegionPayload.findAll,

	// controllers layers
	RegionController.findAll,
]);

route.get("/:region", [
	// validators layers
	RegionHeaders.findOne,
	RegionQuery.findOne,
	RegionPayload.findOne,

	// pipes layers
	RegionGate.parameter,

	// controllers layers
	RegionController.findOne,
]);

route.get("/:region/change", [
	// validators layers
	RegionHeaders.changeRegion,
	RegionQuery.changeRegion,
	RegionPayload.changeRegion,

	// pipes layers
	RegionGate.parameter,

	// controllers layers
	RegionController.changeRegion,
]);

route.post("/", [
	// validators layers
	RegionHeaders.createOne,
	RegionQuery.createOne,
	RegionPayload.createOne,

	// securty
	AuthenticationSecurity.requireAuthentication,
	AuthenticationSecurity.rolesAuthentication(["admin"]),

	// controllers layers
	RegionController.createOne,
]);

route.patch("/:region", [
	// validators layers
	RegionHeaders.updateOne,
	RegionQuery.updateOne,
	RegionPayload.updateOne,

	// securty
	AuthenticationSecurity.requireAuthentication,
	AuthenticationSecurity.rolesAuthentication(["admin"]),

	// pipes layers
	RegionGate.parameter,

	// controllers layers
	RegionController.updateOne,
]);

route.delete("/:region", [
	// validators layers
	RegionHeaders.deleteOne,
	RegionQuery.deleteOne,
	RegionPayload.deleteOne,

	// securty
	AuthenticationSecurity.requireAuthentication,
	AuthenticationSecurity.rolesAuthentication(["admin"]),

	// pipes layers
	RegionGate.parameter,

	// controllers layers
	RegionController.deleteOne,
]);

export default route;
