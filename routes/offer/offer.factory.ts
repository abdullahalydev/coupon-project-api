// packages
import mongoose from "mongoose";

// schemas
import OfferSchema, { OfferSchemaInterface } from "../../schemas/offer.schema";

export default class OfferFactory {
	static async findAll(regionId: string) {
		const query = await OfferSchema.find()
			.and([{ region: regionId }])
			.select([
				"type",
				"title",
				"description",
				"url",
				"expireAt",
				"coupon",
				"url",
			])
			.populate("region", ["name", "display", "country"])
			.populate("brand", ["name", "description", "url"]);

		return query;
	}
	static async findOne(offerId: string, regionId: string) {
		const query = await OfferSchema.findById(offerId)
			.and([{ region: regionId }])
			.select([
				"type",
				"title",
				"description",
				"url",
				"expireAt",
				"coupon",
				"url",
			])
			.populate("region", ["name", "display", "country"])
			.populate("brand", ["name", "description", "url"]);

		return query;
	}

	static async createOne(payload: OfferSchemaInterface) {
		const query = await OfferSchema.create(payload);

		return query;
	}

	static async updateOne(
		offerId: string,
		update: mongoose.UpdateQuery<OfferSchemaInterface>
	) {
		const query = await OfferSchema.findByIdAndUpdate(offerId, update);

		return query;
	}

	static async deleteOne(offerId: string) {
		const query = await OfferSchema.findByIdAndDelete(offerId);

		return query;
	}
}
