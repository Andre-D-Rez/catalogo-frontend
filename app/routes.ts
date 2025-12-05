import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/vitrine", "routes/vitrine.tsx"),
	route("/produto/:id", "routes/produto.$id.tsx"),
	route("/login", "routes/login.tsx"),
	route("/register", "routes/register.tsx"),
	route("/admin", "routes/admin.tsx"),
] satisfies RouteConfig;
