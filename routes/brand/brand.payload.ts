// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class BrandPayload {
	static findAll = validator.body(Joi.object({}));
	static findOne = validator.body(Joi.object({}));
	static findAllOffers = validator.body(Joi.object({}));
	static createOne = validator.body(
		Joi.object({
			name: Joi.string().min(1).max(32).required(),
			description: Joi.string().min(1).max(124).required(),
			url: Joi.string().min(1).max(124).required(),
			regions: Joi.array().items(Joi.string()).required(),
			categories: Joi.array().items(Joi.string()).required(),
		})
	);
	static updateOne = validator.body(
		Joi.object({
			name: Joi.string().min(1).max(32).optional(),
			description: Joi.string().min(1).max(124).optional(),
			url: Joi.string().min(1).max(124).optional(),
			regions: Joi.array().items(Joi.string()).optional(),
			categories: Joi.array().items(Joi.string()).optional(),
		})
	);
	static deleteOne = validator.body(Joi.object({}));
}
