// This needs to be imported before everything else.
// eslint-disable-next-line import/order, @typescript-eslint/no-unused-vars

import "reflect-metadata"; // for TypeORM
import { getCustomRepository } from "typeorm";

import { UserRepository } from "./repositories/user";
import { UsersController } from "./controllers/user";
import { UserService } from "./services/user";
import { connect } from "./util/db-connect";

/**
 * Initialize all ENV values and dependencies here so that they are re-usable across web servers, queue runners and crons
 */
export async function init() {
  // repositories
  await connect();
  const userRepo = getCustomRepository(UserRepository);

  // services
  const userService = new UserService(userRepo);

  // controllers
  const userController = new UsersController(userService);

  return {
    userRepo,
    userService,
    userController,
  };
}
