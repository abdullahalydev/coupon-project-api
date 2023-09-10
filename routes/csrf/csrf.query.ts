// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class CSRFQuery {
	static get = validator.query(Joi.object({}));
}
