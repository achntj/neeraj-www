import { NextRequest, NextResponse } from "next/server";

function getSiteOrigin(request: NextRequest) {
  if (request.nextUrl.hostname === "localhost" && process.env.SITE_URL) {
    return process.env.SITE_URL;
  }

  return request.nextUrl.origin;
}

function callbackHtml(message: "success" | "error", content: unknown) {
  const payload = JSON.stringify(content).replaceAll("<", "\\u003c");

  return `<!doctype html>
<html>
  <head><meta charset="utf-8"><title>Authorizing</title></head>
  <body>
    <script>
      (function () {
        var receiveMessage = function (event) {
          window.opener.postMessage(
            'authorization:github:${message}:${payload}',
            event.origin
          );
        };
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>`;
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse(
      callbackHtml("error", "Missing GitHub OAuth environment variables"),
      { headers: { "content-type": "text/html; charset=utf-8" }, status: 500 },
    );
  }

  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const expectedState = request.cookies.get("cms_oauth_state")?.value;
  if (!code || !state || state !== expectedState) {
    return new NextResponse(callbackHtml("error", "Invalid GitHub OAuth state"), {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 400,
    });
  }

  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: `${getSiteOrigin(request)}/callback`,
      state,
    }),
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok || !tokenData.access_token) {
    return new NextResponse(callbackHtml("error", tokenData), {
      headers: { "content-type": "text/html; charset=utf-8" },
      status: 502,
    });
  }

  const response = new NextResponse(
    callbackHtml("success", { token: tokenData.access_token, provider: "github" }),
    { headers: { "content-type": "text/html; charset=utf-8" } },
  );
  response.cookies.delete("cms_oauth_state");
  return response;
}
