// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class RegionPayload {
	static findAll = validator.body(Joi.object({}));
	static findOne = validator.body(Joi.object({}));
	static changeRegion = validator.body(Joi.object({}));
	static createOne = validator.body(
		Joi.object({
			name: Joi.string().min(1).max(64).required(),
			display: Joi.string().min(1).max(64).required(),
			country: Joi.string().min(1).max(3).required(),
		})
	);
	static updateOne = validator.body(
		Joi.object({
			name: Joi.string().min(1).max(64).optional(),
			display: Joi.string().min(1).max(64).optional(),
			country: Joi.string().min(1).max(3).optional(),
		})
	);
	static deleteOne = validator.body(Joi.object({}));
}
