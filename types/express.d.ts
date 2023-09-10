// packages
import express from "express";

// schemas
import { UserSchemaInterface } from "../schemas/user.schema";

declare global {
	namespace Express {
		export interface Request {
			user: UserSchemaInterface;
		}
	}
}

declare module "express-session" {
	export interface SessionData {
		initialized?: boolean;
		region?: string;
		user?: string;
	}
}
