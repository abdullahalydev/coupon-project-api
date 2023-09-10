// packages
import mongoose from "mongoose";

export interface RegionSchemaInterface {
	name: string;
	display: string;
	country: string;
}

export const RegionSchemaModel = new mongoose.Schema<RegionSchemaInterface>(
	{
		name: {
			type: mongoose.Schema.Types.String,
			requird: true,
		},
		display: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		country: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("region", RegionSchemaModel);
