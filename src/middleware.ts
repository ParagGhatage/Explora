import { NextResponse,NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { request } from 'http'
import { NextURL } from 'next/dist/server/web/next-url'
export {default} from 'next-auth/middleware'

    
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({req: request})
    const url = request.nextUrl

    if(token && (
        url.pathname.startsWith("/SignIn") ||
        url.pathname.startsWith("/SignUp") ||
        url.pathname.startsWith("/")
    )){
        return NextResponse.redirect(new URL('/Home',request.url))
    }

    
}
 
// See "Matching Paths" below to learn more

//config decides on which routes to run middleware
export const config = {
  matcher: ['/SignIn',
            '/SignUp',
            '/',
            ]
}