import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);

const ignoredRoute = createRouteMatcher([
  "/",
  "/about",
  "/contact",
  "/blogs",
  "/projects",
]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  if (ignoredRoute(request)) {
    return;
  }

  const isAuthenticated = await convexAuth.isAuthenticated();

  if (!isPublicPage(request) && !isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  if (isPublicPage(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/");
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/projects",
    "/blogs",
    "/(api|trpc)(.*)",
  ],
};