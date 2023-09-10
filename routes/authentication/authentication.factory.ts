// schemas
import UserSchema, { UserSchemaInterface } from "../../schemas/user.schema";

export default class AuthenticationFactory {
	static async findOneById(id: string) {
		const query = await UserSchema.findById<UserSchemaInterface>(id)
			.select(["fname", "lname", "email", "phone", "roles", "password"])
			.populate(["favorites"]);

		return query;
	}
	static async findOneByEmail(email: string) {
		const query = await UserSchema.findOne<UserSchemaInterface>()
			.and([{ email }])
			.select(["fname", "lname", "email", "phone", "roles", "password"])
			.populate(["favorites"]);

		return query;
	}
	static async findOneByPhone(phone: string) {
		const query = await UserSchema.findOne<UserSchemaInterface>()
			.and([{ phone }])
			.select(["fname", "lname", "email", "phone", "roles", "password"])
			.populate(["favorites"]);

		return query;
	}

	static async createOne(payload: UserSchemaInterface) {
		const query = await UserSchema.create<UserSchemaInterface>(payload);

		return query;
	}
}
