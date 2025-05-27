import datasource from "@/database/datasource";
import profileRoutes from "@/route/profileRoutes";
import index from "@/web/index.html";
import {serve} from "bun";

await datasource.initialize();

const server = serve({
  routes: {
    "/*": index,
    ...profileRoutes
  },
  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true
  }
});

console.debug(`🚀 Server running at ${server.url}`);
