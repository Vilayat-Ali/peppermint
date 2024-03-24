import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
    console.log('hello, middleware there!');
    return NextResponse.json({hello: 'world'})
}

export const config = {
    matcher: [
        '/dashboard'
    ]
}