// mongoose
import mongoose from "mongoose";

// schemas
import RegionSchema, {
	RegionSchemaInterface,
} from "../../schemas/region.schema";

export default class RegionFactory {
	static async findDefault() {
		const query = await RegionSchema.findOne().select([
			"name",
			"display",
			"country",
		]);

		return query;
	}
	static async findAll() {
		const query = await RegionSchema.find().select([
			"name",
			"display",
			"country",
		]);

		return query;
	}

	static async findOne(regionId: string) {
		const query = await RegionSchema.findById(regionId).select([
			"name",
			"display",
			"country",
		]);

		return query;
	}

	static async createOne(region: RegionSchemaInterface) {
		const query = await RegionSchema.create(region);

		return query;
	}

	static async updateOne(
		regionId: string,
		update: mongoose.UpdateQuery<RegionSchemaInterface>
	) {
		const query = await RegionSchema.findByIdAndUpdate(regionId, update);

		return query;
	}

	static async deleteOne(regionId: string) {
		const query = await RegionSchema.findByIdAndDelete(regionId);

		return query;
	}
}
