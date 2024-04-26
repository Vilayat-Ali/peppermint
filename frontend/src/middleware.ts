import { NextResponse, type NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
    console.log(request);
    return NextResponse.json({ hello: 'world' });
}

export const config = {
    matcher: [
        '/dashboard',
        '/connect',
    ]
}