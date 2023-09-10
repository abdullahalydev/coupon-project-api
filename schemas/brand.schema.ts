// packages
import mongoose from "mongoose";

// schemas
import RegionSchema from "./region.schema";

export interface BrandSchemaInterface {
	name: string;
	description: string;
	url: string;
	regions: mongoose.Schema.Types.ObjectId[];
	categories: string[];
}

export const BrandSchemaModel = new mongoose.Schema<BrandSchemaInterface>(
	{
		name: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		description: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		url: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		regions: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: RegionSchema,
		},
		categories: {
			type: [mongoose.Schema.Types.String],
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("brand", BrandSchemaModel);
