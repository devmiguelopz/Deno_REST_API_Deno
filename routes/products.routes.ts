import { Router, Response } from "https://deno.land/x/oak/mod.ts";

import * as indexController from "../controllers/index.controller.ts";

const router = new Router();

router.get("/", ({ response }: { response: Response }) => {
  response.body = "Welcome to my API";
});

router
  .get("/users", indexController.getUsers)
  .post("/users", indexController.createUser)
  .get("/users/:id", indexController.getUser)
  .put("/users/:id", indexController.updateUser)
  .delete("/users/:id", indexController.deleteUser);

export default router;
