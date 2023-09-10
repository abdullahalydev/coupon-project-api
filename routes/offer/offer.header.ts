// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class OfferHeaders {
	static findAll = validator.headers(Joi.object({}));
	static findOne = validator.headers(Joi.object({}));
	static createOne = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
			"content-type": Joi.string().equal("application/json").required(),
		})
	);
	static updateOne = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
			"content-type": Joi.string().equal("application/json").required(),
		})
	);
	static deleteOne = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
		})
	);
}
