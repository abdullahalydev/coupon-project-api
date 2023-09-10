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

describe("region", function () {
	test("GET /region", async function () {
		const application = ExpressApplication.getExpressApplication();
		const virtual = supertest(application);

		const request = await virtual.get("/region");

		expect(request.status).toEqual(200);
		expect(request.body.status).toEqual(request.status);

		expect(request.body.success).toEqual(true);
		expect(request.body.message).toEqual("regions list imported successfully");

		expect(request.body.data).toEqual(expect.any(Object));
	});

	test("GET /region/:region", async function () {
		const application = ExpressApplication.getExpressApplication();
		const virtual = supertest(application);

		const list = await virtual.get("/region");
		const region = await virtual.get(`/region/${list.body.data[0]._id}`);

		expect(region.status).toEqual(200);
		expect(region.body.status).toEqual(region.status);

		expect(region.body.success).toEqual(true);
		expect(region.body.message).toEqual("region imported successfully");

		expect(region.body.data).toEqual(expect.any(Object));
	});

	test.skip("POST /region", async function () {
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
		const region = await virtual
			.post(`/region`)
			.set({
				Cookie: [
					...authentication.headers["set-cookie"],
					...csrf.headers["set-cookie"],
				],
				"Content-Type": "application/json",
				"CSRF-TOKEN": csrf.body.data,
			})
			.send({
				name: "test",
				display: "test",
				country: "EG",
			});

		expect(region.status).toEqual(201);
		expect(region.body.status).toEqual(region.status);

		expect(region.body.success).toEqual(true);
		expect(region.body.message).toEqual("region created successfully");

		expect(region.body.data).toEqual(expect.any(Object));
	});

	test.skip("PATCH /region", async function () {
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
		const list = await virtual.get("/region");
		const region = await virtual
			.patch(`/region/${list.body.data.shift()._id}`)
			.set({
				Cookie: [
					...authentication.headers["set-cookie"],
					...csrf.headers["set-cookie"],
				],
				"Content-Type": "application/json",
				"CSRF-TOKEN": csrf.body.data,
			})
			.send({
				name: `egypt`,
			});

		expect(region.status).toEqual(200);
		expect(region.body.status).toEqual(region.status);

		expect(region.body.success).toEqual(true);
		expect(region.body.message).toEqual("region updated successfully");

		expect(region.body.data).toEqual(expect.any(Object));
	});

	test.skip("DELETE /region", async function () {
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
		const list = await virtual.get("/region");
		const region = await virtual
			.delete(`/region/${list.body.data.shift()._id}`)
			.set({
				Cookie: [
					...authentication.headers["set-cookie"],
					...csrf.headers["set-cookie"],
				],
				"Content-Type": "application/json",
				"CSRF-TOKEN": csrf.body.data,
			});

		expect(region.status).toEqual(200);
		expect(region.body.status).toEqual(region.status);

		expect(region.body.success).toEqual(true);
		expect(region.body.message).toEqual("region deleted successfully");

		expect(region.body.data).toEqual(expect.any(Object));
	});
});
