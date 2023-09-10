// packages
import supertest from "supertest";

// libraries
import Env from "../libraries/dotenv.library";
import Database from "../libraries/mongoose.library";

// application
import ExpressApplication from "../bin/www";

beforeAll(() => {
	Env.init();

	Database.init();

	ExpressApplication.initStandardMiddlewares();
	ExpressApplication.initSecurityMiddlewares();
	ExpressApplication.initMiddlewares();

	ExpressApplication.initRoutes();

	ExpressApplication.initErrorHandler();
});

describe("csrf", function () {
	test("GET /csrf", async function () {
		const application = ExpressApplication.getExpressApplication();
		const virtual = supertest(application);
		const request = await virtual.get("/csrf");

		expect(request.status).toEqual(201);
		expect(request.body.status).toEqual(request.status);

		expect(request.body.success).toEqual(true);
		expect(request.body.message).toEqual("token generated successfully");

		expect(request.body.data).toEqual(expect.any(String));
	});

});
