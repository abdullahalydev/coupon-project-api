// packages
import mongoose from "mongoose";

// schemas
import OfferSchema from "./offer.schema";

export interface UserSchemaInterface {
	id?: string;
	fname: string;
	lname: string;
	email: string;
	phone: string;
	roles?: string[];
	favorites?: mongoose.Schema.Types.ObjectId[];
	password: string;
}

export const UserSchemaModel = new mongoose.Schema<UserSchemaInterface>(
	{
		fname: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		lname: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
		email: {
			type: mongoose.Schema.Types.String,
			required: true,
			unique: true,
		},
		phone: {
			type: mongoose.Schema.Types.String,
			required: true,
			unique: true,
		},
		roles: {
			type: [mongoose.Schema.Types.String],
			required: true,
		},
		favorites: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: OfferSchema,
			required: true,
		},
		password: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("user", UserSchemaModel);
