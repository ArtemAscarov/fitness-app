import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const access = request.cookies.get("accessToken")?.value;
  const refresh = request.cookies.get("refreshToken")?.value;

  if (access) {
    return NextResponse.next();
  }

  if (!refresh) {
    return NextResponse.next();
  }

  const refreshReq = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`,
    { method: "POST", headers: { Cookie: `refreshToken=${refresh}` } },
  );

  if (!refreshReq.ok) {
    const response = NextResponse.next();
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  const setCookies = refreshReq.headers.getSetCookie();

  for (const str of setCookies) {
    const [pair] = str.split(";");
    const index = pair.indexOf("=");
    const key = pair.slice(0, index);
    const value = pair.slice(index + 1);
    request.cookies.set(key, value);
  }

  const response = NextResponse.next({ request });

  for (const str of setCookies) {
    response.headers.append("Set-Cookie", str);
  }

  return response;
}

export const config = { matcher: ["/exercise/:path*", "/favorite"] };
