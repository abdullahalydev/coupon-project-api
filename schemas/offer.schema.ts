// packages
import mongoose from "mongoose";

// schemas
import BrandSchema from "./brand.schema";
import RegionSchema from "./region.schema";

export interface OfferSchemaInterface {
	type: "COUPON" | "OFFER";
	title: string;
	description: string;
	brand: mongoose.Schema.Types.ObjectId;
	region: mongoose.Schema.Types.ObjectId;
	coupon: string;
	url: string;
	expireAt: Date;
}

export const OfferSchemaModel = new mongoose.Schema<OfferSchemaInterface>(
	{
		type: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		title: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		description: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		brand: {
			type: mongoose.Schema.Types.ObjectId,
			ref: BrandSchema,
			required: true,
		},
		region: {
			type: mongoose.Schema.Types.ObjectId,
			ref: RegionSchema,
			required: true,
		},
		coupon: {
			type: mongoose.Schema.Types.String,
			required: false,
		},
		url: {
			type: mongoose.Schema.Types.String,
			required: false,
		},
		expireAt: {
			type: mongoose.Schema.Types.Date,
			required: false,
			default: () => new Date(),
		},
	},
	{ timestamps: true }
);

export default mongoose.model("offer", OfferSchemaModel);
