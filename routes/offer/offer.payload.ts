// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class OfferPayload {
	static findAll = validator.body(Joi.object({}));
	static findOne = validator.body(Joi.object({}));
	static createOne = validator.body(
		Joi.object({
			type: Joi.string()
				.label("type")
				.min(1)
				.max(6)
				.uppercase()
				.trim()
				.valid("COUPON", "OFFER")
				.required(),
			title: Joi.string().label("title").min(1).max(34).required(),
			description: Joi.string().label("description").max(64).required(),
			brand: Joi.string().label("brand").length(24).required(),
			region: Joi.string().label("region").length(24).required(),
			coupon: Joi.string()
				.label("coupon")
				.max(16)
				.when("type", [
					{ is: "COUPON", then: Joi.required(), otherwise: Joi.forbidden() },
				])
				.optional(),
			url: Joi.string()
				.label("url")
				.max(16)
				.when("type", [
					{ is: "OFFER", then: Joi.required(), otherwise: Joi.forbidden() },
				])
				.optional(),
			expireAt: Joi.date().min("now").required(),
		})
	);
	static updateOne = validator.body(
		Joi.object({
			type: Joi.string()
				.label("type")
				.min(1)
				.max(6)
				.uppercase()
				.trim()
				.valid("COUPON", "OFFER")
				.optional(),
			title: Joi.string().label("title").min(1).max(34).optional(),
			description: Joi.string().label("description").max(64).optional(),
			brand: Joi.string().label("brand").length(24).optional(),
			region: Joi.string().label("region").length(24).optional(),
			coupon: Joi.string()
				.label("coupon")
				.max(16)
				.when("type", [
					{ is: "COUPON", then: Joi.optional(), otherwise: Joi.forbidden() },
				])
				.optional(),
			url: Joi.string()
				.label("url")
				.max(16)
				.when("type", [
					{ is: "OFFER", then: Joi.optional(), otherwise: Joi.forbidden() },
				])
				.optional(),
			expireAt: Joi.date().min("now").optional(),
		}).xor("coupon", "url")
	);
	static deleteOne = validator.body(Joi.object({}));
}
