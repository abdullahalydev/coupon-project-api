// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class CSRFHeaders {
	static get = validator.headers(Joi.object({}));
}
