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

describe("offer", function () {
	test("GET /offer", async function () {
		const application = ExpressApplication.getExpressApplication();
		const virtual = supertest(application);

		const request = await virtual.get("/offer");

		expect(request.status).toEqual(200);
		expect(request.body.status).toEqual(request.status);

		expect(request.body.success).toEqual(true);
		expect(request.body.message).toEqual("offers list imported successfully");

		expect(request.body.data).toEqual(expect.any(Object));
	});

	test("GET /offer/:offer", async function () {
		const application = ExpressApplication.getExpressApplication();
		const virtual = supertest(application);

		const list = await virtual.get("/offer");
		const offer = await virtual.get(`/offer/${list.body.data[0]._id}`);

		expect(offer.status).toEqual(200);
		expect(offer.body.status).toEqual(offer.status);

		expect(offer.body.success).toEqual(true);
		expect(offer.body.message).toEqual("offer imported successfully");

		expect(offer.body.data).toEqual(expect.any(Object));
	});

	test.skip("POST /offer", async function () {
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
		const offer = await virtual
			.post(`/offer`)
			.set({
				Cookie: [
					...authentication.headers["set-cookie"],
					...csrf.headers["set-cookie"],
				],
				"Content-Type": "application/json",
				"CSRF-TOKEN": csrf.body.data,
			})
			.send({
				type: "COUPON",
				title: "test",
				description: "test",
				brand: "64f7feb736c42f05ce4cc6fa",
				region: "64fbb03f87636be8d677f34e",
				coupon: "asdbce",
			});

		expect(offer.status).toEqual(201);
		expect(offer.body.status).toEqual(offer.status);

		expect(offer.body.success).toEqual(true);
		expect(offer.body.message).toEqual("offer created successfully");

		expect(offer.body.data).toEqual(expect.any(Object));
	});

	test.skip("PATCH /offer", async function () {
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
		const list = await virtual.get("/offer");
		const offer = await virtual
			.patch(`/offer/${list.body.data.shift()._id}`)
			.set({
				Cookie: [
					...authentication.headers["set-cookie"],
					...csrf.headers["set-cookie"],
				],
				"Content-Type": "application/json",
				"CSRF-TOKEN": csrf.body.data,
			})
			.send({
				title: `tests`,
			});

		expect(offer.status).toEqual(200);
		expect(offer.body.status).toEqual(offer.status);

		expect(offer.body.success).toEqual(true);
		expect(offer.body.message).toEqual("offer updated successfully");

		expect(offer.body.data).toEqual(expect.any(Object));
	});

	test.skip("DELETE /offer", async function () {
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
		const list = await virtual.get("/offer");
		const offer = await virtual
			.delete(`/offer/${list.body.data.shift()._id}`)
			.set({
				Cookie: [
					...authentication.headers["set-cookie"],
					...csrf.headers["set-cookie"],
				],
				"Content-Type": "application/json",
				"CSRF-TOKEN": csrf.body.data,
			});

		expect(offer.status).toEqual(200);
		expect(offer.body.status).toEqual(offer.status);

		expect(offer.body.success).toEqual(true);
		expect(offer.body.message).toEqual("offer deleted successfully");

		expect(offer.body.data).toEqual(expect.any(Object));
	});
});
