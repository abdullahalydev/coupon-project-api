// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class UserPayload {
	static findOne = validator.body(Joi.object({}));
}
