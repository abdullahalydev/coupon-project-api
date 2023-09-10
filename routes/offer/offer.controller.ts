// packages
import express from "express";

// schemas
import { OfferSchemaInterface } from "../../schemas/offer.schema";

// factory
import OfferFactory from "./offer.factory";

export default class OfferController {
	static async findAll(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const regionId = request.session.region as string;

		try {
			const offers = await OfferFactory.findAll(regionId);

			response.status(200).json({
				status: 200,
				success: true,
				message: "offers list imported successfully",
				data: offers,
			});
		} catch (error) {
			next(error);
		}
	}

	static async findOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const regionId = request.session.region as string;

		// params
		const offerId = request.params.offer as string;

		try {
			const offer = await OfferFactory.findOne(offerId, regionId);

			response.status(200).json({
				status: 200,
				success: true,
				message: "offer imported successfully",
				data: offer,
			});
		} catch (error) {
			next(error);
		}
	}

	static async createOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const payload = request.body as OfferSchemaInterface;

		try {
			const offer = await OfferFactory.createOne(payload);

			response.status(201).json({
				status: 201,
				success: true,
				message: "offer created successfully",
				data: offer,
			});
		} catch (error) {
			next(error);
		}
	}
	static async updateOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// params
		const offerId = request.params.offer as string;

		// payload
		const payload = request.body as OfferSchemaInterface;

		try {
			const offer = await OfferFactory.updateOne(offerId, payload);

			response.status(201).json({
				status: 201,
				success: true,
				message: "offer updated successfully",
				data: offer,
			});
		} catch (error) {
			next(error);
		}
	}
	static async deleteOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// params
		const offerId = request.params.offer as string;

		try {
			const offer = await OfferFactory.deleteOne(offerId);

			response.status(201).json({
				status: 201,
				success: true,
				message: "offer deleted successfully",
				data: offer,
			});
		} catch (error) {
			next(error);
		}
	}
}
