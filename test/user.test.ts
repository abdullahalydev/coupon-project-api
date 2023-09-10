// packages
import supertest from "supertest";
import supersession from "supertest-session";

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

describe("user", function () {
	test("GET /user", async function () {
		const application = ExpressApplication.getExpressApplication();
		const virtual = supertest(application);

		const csrf = await virtual.get("/csrf");
		const authentication = await virtual
			.post("/authentication/login")
			.set({
				Cookie: csrf.headers["set-cookie"],
				"Content-Type": "application/json",
				"CSRF-TOKEN": csrf.body.data,
			})
			.send({
				email: "abdullahaly.dev@gmail.com",
				password: "12345678",
			});

		const user = await virtual.get("/user").set({
			Cookie: authentication.headers["set-cookie"],
		});

		expect(user.status).toEqual(200);
		expect(user.body.status).toEqual(user.status);

		expect(user.body.success).toEqual(true);
		expect(user.body.message).toEqual("user imported successfully");

		expect(user.body.data).toEqual(expect.any(Object));
	});
});
