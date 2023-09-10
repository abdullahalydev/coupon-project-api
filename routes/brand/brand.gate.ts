// packages
import express from "express";
import mongoose from "mongoose";

// factories
import BrandFactory from "./brand.factory";

export default class BrandGate {
	static async payload(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const brandId = request.body.brand as string;

		// session
		const regionId = request.session.region as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(brandId);

			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid id type",
				});
				return;
			}

			const brand = await BrandFactory.findOne(brandId, regionId);

			if (!brand) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "offer not found",
				});
				return;
			}

			next();
		} catch (error) {
			next(error);
		}
	}
	static async query(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const brandId = request.query.brand as string;

		// session
		const regionId = request.session.region as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(brandId);

			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid id type",
				});
				return;
			}

			const brand = await BrandFactory.findOne(brandId, regionId);

			if (!brand) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "offer not found",
				});
				return;
			}

			next();
		} catch (error) {
			next(error);
		}
	}
	static async parameter(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const brandId = request.params.brand as string;

		// session
		const regionId = request.session.region as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(brandId);

			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid id type",
				});
				return;
			}

			const brand = await BrandFactory.findOne(brandId, regionId);

			if (!brand) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "offer not found",
				});
				return;
			}

			next();
		} catch (error) {
			next(error);
		}
	}
}
