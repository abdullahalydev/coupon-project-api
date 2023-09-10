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

describe("brand", function () {
	test("GET /brand", async function () {
		const application = ExpressApplication.getExpressApplication();
		const virtual = supertest(application);

		const request = await virtual.get("/brand");

		expect(request.status).toEqual(200);
		expect(request.body.status).toEqual(request.status);

		expect(request.body.success).toEqual(true);
		expect(request.body.message).toEqual("brands list imported successfully");

		expect(request.body.data).toEqual(expect.any(Object));
	});

	test("GET /brand/:brand", async function () {
		const application = ExpressApplication.getExpressApplication();
		const virtual = supertest(application);

		const list = await virtual.get("/brand");
		const brand = await virtual.get(`/brand/${list.body.data[0]._id}`);

		expect(brand.status).toEqual(200);
		expect(brand.body.status).toEqual(brand.status);

		expect(brand.body.success).toEqual(true);
		expect(brand.body.message).toEqual("brand imported successfully");

		expect(brand.body.data).toEqual(expect.any(Object));
	});

	test("GET /brand/:brand/offers", async function () {
		const application = ExpressApplication.getExpressApplication();
		const virtual = supertest(application);

		const list = await virtual.get("/brand");
		const brand = await virtual.get(`/brand/${list.body.data[0]._id}/offers`);

		expect(brand.status).toEqual(200);
		expect(brand.body.status).toEqual(brand.status);

		expect(brand.body.success).toEqual(true);
		expect(brand.body.message).toEqual("brand offers imported successfully");

		expect(brand.body.data).toEqual(expect.any(Object));
	});

	test.skip("POST /brand", async function () {
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
		const brand = await virtual
			.post(`/brand`)
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
				description: "test",
				url: "https://www.test.com",
				regions: ["64f793d5fee3266f4917669b"],
				categories: ["test"]
			});

		expect(brand.status).toEqual(201);
		expect(brand.body.status).toEqual(brand.status);

		expect(brand.body.success).toEqual(true);
		expect(brand.body.message).toEqual("brand created successfully");

		expect(brand.body.data).toEqual(expect.any(Object));
	});

	test.skip("PATCH /brand", async function () {
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
		const list = await virtual.get("/brand");
		const brand = await virtual
			.patch(`/brand/${list.body.data.shift()._id}`)
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

		expect(brand.status).toEqual(200);
		expect(brand.body.status).toEqual(brand.status);

		expect(brand.body.success).toEqual(true);
		expect(brand.body.message).toEqual("brand updated successfully");

		expect(brand.body.data).toEqual(expect.any(Object));
	});

	test.skip("DELETE /brand", async function () {
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
		const list = await virtual.get("/brand");
		const brand = await virtual
			.delete(`/brand/${list.body.data.shift()._id}`)
			.set({
				Cookie: [
					...authentication.headers["set-cookie"],
					...csrf.headers["set-cookie"],
				],
				"Content-Type": "application/json",
				"CSRF-TOKEN": csrf.body.data,
			});

		expect(brand.status).toEqual(200);
		expect(brand.body.status).toEqual(brand.status);

		expect(brand.body.success).toEqual(true);
		expect(brand.body.message).toEqual("brand deleted successfully");

		expect(brand.body.data).toEqual(expect.any(Object));
	});
});
