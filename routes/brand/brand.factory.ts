// schemas
import BrandSchema, { BrandSchemaInterface } from "../../schemas/brand.schema";
import OfferSchema from "../../schemas/offer.schema";

export default class BrandFactory {
	static async findAll(regionId: string) {
		const query = await BrandSchema.find()
			.and([{ regions: { $in: [regionId] } }])
			.select(["name", "description", "url", "regions", "categories"]);

		return query;
	}

	static async findOne(brandId: string, regionId: string) {
		const query = await BrandSchema.findById(brandId)
			.and([{ regions: { $in: [regionId] } }])
			.select(["name", "description", "url", "regions", "categories"]);

		return query;
	}

	static async findAllOffers(brandId: string, regionId: string) {
		const query = await OfferSchema.find()
			.and([{ brand: brandId }, { region: regionId }])
			.select(["type", "title", "description", "coupon", "url", "expireAt"])
			.populate("region", ["name", "display", "country"])
			.populate("brand", ["name", "description", "url"]);

		return query;
	}

	static async createOne(payload: BrandSchemaInterface) {
		const query = await BrandSchema.create(payload);

		return query;
	}

	static async updateOne(brandId: string, update: BrandSchemaInterface) {
		const query = await BrandSchema.findByIdAndUpdate(brandId, update);

		return query;
	}

	static async deleteOne(brandId: string) {
		const query = await BrandSchema.findByIdAndDelete(brandId);

		return query;
	}
}
