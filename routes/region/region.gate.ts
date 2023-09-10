// packages
import express from "express";
import mongoose from "mongoose";

// services
import RegionService from "./region.factory";

export default class RegionGate {
	static payload(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const regionId = request.body.region as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(regionId);

			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid id type",
				});
				return;
			}

			const region = RegionService.findOne(regionId);

			if (!region) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "region not found",
				});
				return;
			}

			next();
		} catch (error) {
			next(error);
		}
	}
	static query(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const regionId = request.query.region as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(regionId);

			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid id type",
				});
				return;
			}

			const region = RegionService.findOne(regionId);

			if (!region) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "region not found",
				});
				return;
			}

			next();
		} catch (error) {
			next(error``);
		}
	}
	static parameter(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const regionId = request.params.region as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(regionId);

			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid id type",
				});
				return;
			}

			const region = RegionService.findOne(regionId);

			if (!region) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "region not found",
				});
				return;
			}

			next();
		} catch (error) {
			next(error``);
		}
	}
}
