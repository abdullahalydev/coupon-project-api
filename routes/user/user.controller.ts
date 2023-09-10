// pacakges
import express from "express";

// factories
import UserFactory from "./user.factory";

export default class UserController {
	static async findOne(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const userId = request.user.id;

		try {
			const user = await UserFactory.findOne(userId);

			response.status(200).json({
				status: 200,
				success: true,
				message: "user imported successfully",
				data: user,
			});
		} catch (error) {
			next(error);
		}
	}
}
