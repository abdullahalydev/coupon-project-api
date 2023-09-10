// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class AuthenticationHeaders {
	static status = validator.headers(Joi.object({}));
	static login = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
			"content-type": Joi.string().equal("application/json").required(),
		})
	);
	static register = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
			"content-type": Joi.string().equal("application/json").required(),
		})
	);
	static logout = validator.headers(
		Joi.object({
			"csrf-token": Joi.string().required(),
		})
	);
}
