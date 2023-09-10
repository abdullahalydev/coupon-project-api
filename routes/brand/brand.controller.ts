// packages
import express from "express";

// factories
import BrandFactory from "./brand.factory";

export default class BrandController {
	static async findAll(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const regionId = request.session.region;

		try {
			const brands = await BrandFactory.findAll(regionId);

			response.status(200).json({
				status: 200,
				success: true,
				message: "brands list imported successfully",
				data: brands,
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
		const regionId = request.session.region;

		// params
		const brandId = request.params.brand;

		try {
			const brand = await BrandFactory.findOne(brandId, regionId);

			response.status(200).json({
				status: 200,
				success: true,
				message: "brand imported successfully",
				data: brand,
			});
		} catch (error) {
			next(error);
		}
	}

	static async findAllOffers(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const regionId = request.session.region;

		// params
		const brandId = request.params.brand;

		try {
			const offers = await BrandFactory.findAllOffers(brandId, regionId);

			response.status(200).json({
				status: 200,
				success: true,
				message: "brand offers imported successfully",
				data: offers,
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
		const payload = request.body;

		try {
			const brand = await BrandFactory.createOne(payload);

			response.status(201).json({
				status: 201,
				success: true,
				message: "brand created successfully",
				data: brand,
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
		const brandId = request.params.brand;

		// payload
		const payload = request.body;

		try {
			const brand = await BrandFactory.updateOne(brandId, payload);

			response.status(200).json({
				status: 200,
				success: true,
				messsage: "brand updated successfully",
				data: brand,
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
		// session
		const regionId = request.session.region;

		// parms
		const brandId = request.params.brand;

		try {
			const list = await BrandFactory.findAll(regionId);
			if (list.length <= 1) {
				response.status(403).json({
					status: 403,
					success: false,
					message: "cannot delete last region",
				});
				return;
			}

			const brand = await BrandFactory.deleteOne(brandId);

			response.status(200).json({
				status: 200,
				success: true,
				message: "brand delete successfully",
				data: brand,
			});
		} catch (error) {
			next(error);
		}
	}
}
