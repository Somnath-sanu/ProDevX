import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth"]);
const ignoredRoute = createRouteMatcher(["/", "/about", "/contact", "/blogs" , "/projects"]);

export default convexAuthNextjsMiddleware((request, { convexAuth }) => {
  if (ignoredRoute(request)) {
    return;
  }
  if (!isPublicPage(request) && !convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  if (isPublicPage(request) && convexAuth.isAuthenticated()) {
    return nextjsMiddlewareRedirect(request, "/");
  }
});

export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  matcher: ["/((?!.*\\..*|_next).*)", "/projects", "/blogs", "/(api|trpc)(.*)"],
};
