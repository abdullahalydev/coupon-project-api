// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class UserHeaders {
	static findOne = validator.headers(Joi.object({}));
}
