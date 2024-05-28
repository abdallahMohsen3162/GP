import { NextRequest, NextResponse } from "next/server";

export function middleware(request) {
    
    let home = request.url.search("Home");
    const userIsAuthenticated = request.cookies.get("authToken");
    // if (home >= 0 && !userIsAuthenticated) 
    //     return NextResponse.redirect(new URL("/", request.url));


    return NextResponse.next();
}

export const config = {
    matcher: ["/Home"]
}