// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class AuthetnicationQuery {
	static status = validator.query(Joi.object({}));
	static login = validator.query(Joi.object({}));
	static register = validator.query(Joi.object({}));
	static logout = validator.query(Joi.object({}));
}
