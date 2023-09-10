// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class CSRFPayload {
	static get = validator.body(Joi.object({}));
}
