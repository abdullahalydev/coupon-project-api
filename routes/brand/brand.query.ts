// packages
import Joi from "joi";

// helpers
import validator from "../../helpers/validator.helper";

export default class BrandQuery {
	static findAll = validator.query(Joi.object({}));
	static findOne = validator.query(Joi.object({}));
	static findAllOffers = validator.query(Joi.object({}));
	static createOne = validator.query(Joi.object({}));
	static updateOne = validator.query(Joi.object({}));
	static deleteOne = validator.query(Joi.object({}));
}
