// packges
import express from "express";

// schemas
import { RegionSchemaInterface } from "../../schemas/region.schema";

// factories
import RegionFactory from "./region.factory";

export default class RegionController {
	static async findAll(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			const regions = await RegionFactory.findAll();

			response.status(200).json({
				status: 200,
				success: true,
				message: "regions list imported successfully",
				data: regions,
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
		const regionId = request.params.region as string;

		try {
			const region = await RegionFactory.findOne(regionId);

			response.status(200).json({
				status: 200,
				success: true,
				message: "region imported successfully",
				data: region,
			});
		} catch (error) {
			next(error);
		}
	}

	static async changeRegion(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const regionId = request.params.region as string;

		try {
			const region = await RegionFactory.findOne(regionId);

			request.session.region = region.id;

			response.status(200).json({
				status: 200,
				success: true,
				message: "region changed successfully",
				data: region,
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
		const payload = request.body as RegionSchemaInterface;

		try {
			const region = await RegionFactory.createOne(payload);

			response.status(201).json({
				status: 201,
				success: true,
				message: "region created successfully",
				data: region,
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
		const regionId = request.params.region as string;

		const payload = request.body as RegionSchemaInterface;

		try {
			const region = await RegionFactory.updateOne(regionId, payload);

			response.status(200).json({
				status: 200,
				success: true,
				message: "region updated successfully",
				data: region,
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
		const regionId = request.params.region as string;

		try {
			const region = await RegionFactory.deleteOne(regionId);

			response.status(200).json({
				status: 200,
				success: true,
				message: "region deleted successfully",
				data: region,
			});
		} catch (error) {
			next(error);
		}
	}
}
