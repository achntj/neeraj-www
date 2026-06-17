import { NextRequest, NextResponse } from "next/server";

function getSiteOrigin(request: NextRequest) {
  if (request.nextUrl.hostname === "localhost" && process.env.SITE_URL) {
    return process.env.SITE_URL;
  }

  return request.nextUrl.origin;
}

export function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Missing GITHUB_OAUTH_CLIENT_ID" }, { status: 500 });
  }

  const origin = getSiteOrigin(request);
  const state = crypto.randomUUID();
  const authUrl = new URL("https://github.com/login/oauth/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", `${origin}/callback`);
  authUrl.searchParams.set("scope", "repo,user");
  authUrl.searchParams.set("state", state);

  const response = NextResponse.redirect(authUrl);
  response.cookies.set("cms_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: origin.startsWith("https://"),
    maxAge: 10 * 60,
    path: "/",
  });
  return response;
}
