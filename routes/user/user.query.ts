// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class UserQuery {
	static findOne = validator.query(Joi.object({}));
}
