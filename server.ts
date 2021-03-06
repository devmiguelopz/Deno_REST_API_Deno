import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./routes/products.routes.ts";

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.info("Server running on port", 3000);

app.listen({ port: 3000 });

export default app;
