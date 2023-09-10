// packages
import express from "express";
import mongoose from "mongoose";

// factories
import OfferFactory from "./offer.factory";

export default class OfferGate {
	static async payload(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const offerId = request.body.offer as string;

		// session
		const regionId = request.session.region as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(offerId);

			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid id type",
				});
				return;
			}

			const offer = await OfferFactory.findOne(offerId, regionId);

			if (!offer) {
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
		const offerId = request.query.offer as string;

		// session
		const regionId = request.session.region as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(offerId);

			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid id type",
				});
				return;
			}

			const offer = await OfferFactory.findOne(offerId, regionId);

			if (!offer) {
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
		const offerId = request.params.offer as string;

		// session
		const regionId = request.session.region as string;

		try {
			const validate = mongoose.Types.ObjectId.isValid(offerId);

			if (!validate) {
				response.status(404).json({
					status: 400,
					success: false,
					message: "invalid id type",
				});
				return;
			}

			const offer = await OfferFactory.findOne(offerId, regionId);

			if (!offer) {
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
