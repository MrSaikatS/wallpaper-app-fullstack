import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export const proxy = async (request: NextRequest) => {
	const sessionCookie = getSessionCookie(request, {
		cookiePrefix: "wp",
	});

	// THIS IS NOT SECURE!
	// This is the recommended approach to optimistically redirect users
	// We recommend handling auth checks in each page/route

	if (!sessionCookie) {
		return NextResponse.redirect(new URL("/auth/login", request.url));
	}

	return NextResponse.next();
};

export const config = {
	matcher: "/studio/:path*",
};
