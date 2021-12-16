import { NextFunction, Request, Response, Router } from "express";
import { User } from "src/entities/user";
import { DeleteResult, InsertResult } from "typeorm";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserService {
  getUserByID(id: number): Promise<User>;
  getUsers(limit: string, offset: string): Promise<User[]>;

  createUser(user: User): Promise<User>;
  updateUserByID(user: User): Promise<User>;
  deleteUserByID(id: number): Promise<DeleteResult>;
}

export class UsersController {
  private readonly router: Router;

  private static userService: IUserService;

  public constructor(userService: IUserService) {
    UsersController.userService = userService;

    this.router = Router();
    this.router.get("/", UsersController.getUsers);
    this.router.post("/", UsersController.createUser);
    // this.router.get("/:id", UsersController.getUserByID);
  }

  getRouter() {
    return this.router;
  }

  static async getUserByID(req: Request, res: Response) {
    const users = await UsersController.userService.getUserByID(Number(req.params.id));
    return res.status(200).json(users);
  }

  static async getUsers(req: Request, res: Response) {
    const { offset, limit } = req.query;
    const users = await UsersController.userService.getUsers(limit as string, offset as string);
    return res.status(200).json(users);
  }

  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UsersController.userService.createUser(req.body);
      res.status(200).json(user);
    } catch (e) {
      next({ code: 400, message: e.toString() });
    }
  }

  static async updateUserByID(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      req.body.id = id;
      const user = await UsersController.userService.updateUserByID(req.body);
      res.status(200).json(user);
    } catch (e) {
      next({ code: 400, message: e.toString() });
    }
  }

  static async deleteUserByID(req: Request, res: Response, next: NextFunction) {
    try {
      await UsersController.userService.deleteUserByID(Number(req.params.id));
      res.status(200).json({ id: req.params.id });
    } catch (e) {
      next({ code: 400, message: e.toString() });
    }
  }
}
