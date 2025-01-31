import { NextRequest } from "next/server";

declare module "next/server" {
	export interface NextRequestExtended extends NextRequest {
		params: {
			[key: string]: string | string[];
		};
	}

	export type RouteHandler = (
		request: NextRequestExtended,
		context: { params: { [key: string]: string } }
	) => Promise<Response>;
}
