// pacakges
import express from "express";
import session from "express-session";
import mongo from "connect-mongo";
import ms from "ms";

// factories
import RegionFactory from "../routes/region/region.factory";

export default class SessionMiddleware {
	static init = session({
		secret: process.env.SESSIONKEY,
		name: "session",
		// store: new mongo({
		// 	mongoUrl: process.env.DATABASE,
		// 	crypto: { secret: process.env.SESSIONKEY },
		// }),
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			maxAge: ms("7 days"),
		},
	});
	static async initializer(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const defaultRegion = await RegionFactory.findDefault();

		if (!request.session.initialized) {
			request.session.initialized = true;
			request.session.region = String(defaultRegion._id);
			request.session.user = String();
		}

		next();
	}

	static async regenerator(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const session = request.session;

		request.session.regenerate(function (error) {
			if (error) {
				response.status(400).json({
					status: 400,
					success: false,
					message: "something went wrong while regenerating session",
				});
				return;
			}

			for (const key in session) {
				request.session[key] = session[key];
			}

			next();
		});
	}
}
