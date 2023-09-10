// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class AuthenticationPayload {
	static register = validator.body(
		Joi.object({
			fname: Joi.string().alphanum().trim().min(1).max(32).required(),
			lname: Joi.string().alphanum().trim().min(1).max(32).required(),
			email: Joi.string().email().trim().min(1).max(64).required(),
			phone: Joi.string().trim().min(1).max(24).required(),
			password: Joi.string().min(8).max(64).required(),
		})
	);
	static login = validator.body(
		Joi.object({
			email: Joi.string().email().trim().min(1).max(64).required(),
			password: Joi.string().min(8).max(64).required(),
		})
	);
	static logout = validator.body(Joi.object({}));
	static status = validator.body(Joi.object({}));
}
